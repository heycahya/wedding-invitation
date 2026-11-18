/**
 * Google Apps Script Web App — Digital Wedding Invitation Backend
 *
 * Setup Script Properties (Project Settings -> Script Properties):
 * - MASTER_REGISTRY_ID : Spreadsheet ID milik Master Registry (tab "Registry": slug | spreadsheet_id | status | title | created_at)
 * - CLIENT_SHEET_ID    : (Opsional fallback) Spreadsheet ID langsung jika deploy single-sheet tanpa Master Registry
 *
 * Deploy sebagai Web App:
 * - Execute as: Me
 * - Who has access: Anyone
 */

var REGISTRY_CACHE_TTL = 900; // 15 menit
var RATE_LIMIT_TTL = 30;      // 30 detik
var MAX_GUESTBOOK_ITEMS = 100;

function doGet(e) {
  try {
    var slug = sanitizeSlug_(e && e.parameter ? e.parameter.slug : '');
    if (!slug) {
      return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Parameter slug tidak valid.', items: [] });
    }

    var ss = resolveSpreadsheet_(slug);
    if (!ss) {
      return jsonResponse_({ ok: false, code: 'NOT_FOUND', message: 'Undangan tidak ditemukan atau tidak aktif.', items: [] });
    }

    // ISOLASI MUTLAK: doGet hanya membaca tab Guestbook, dilarang keras membaca tab RSVP.
    var sheet = ss.getSheetByName('Guestbook');
    if (!sheet) {
      return jsonResponse_({ ok: true, slug: slug, items: [] });
    }

    var values = sheet.getDataRange().getValues();
    var items = [];

    for (var i = values.length - 1; i >= 1; i--) {
      var row = values[i];
      var isHidden = String(row[3] || '').trim().toUpperCase() === 'TRUE';
      if (isHidden) continue;

      var name = stripLeadingQuote_(String(row[1] || '').trim());
      var message = stripLeadingQuote_(String(row[2] || '').trim());
      if (!name || !message) continue;

      items.push({
        id: 'gb_' + (i + 1),
        name: name,
        message: message,
        createdAt: row[0] ? String(row[0]) : ''
      });

      if (items.length >= MAX_GUESTBOOK_ITEMS) break;
    }

    return jsonResponse_({ ok: true, slug: slug, items: items });
  } catch (err) {
    return jsonResponse_({ ok: false, code: 'SERVER_ERROR', message: 'Gagal memuat ucapan.', items: [] });
  }
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '';
    if (!raw) {
      return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Payload kosong.' });
    }

    var body = JSON.parse(raw);

    // Honeypot check: silent drop untuk bot
    if (String(body.hp_field || '').trim() !== '') {
      return jsonResponse_({ ok: true, code: 'SUCCESS', message: 'Data berhasil disimpan.' });
    }

    var slug = sanitizeSlug_(body.slug);
    var type = String(body.type || '').trim().toLowerCase();
    var payload = body.payload || {};

    if (!slug || (type !== 'rsvp' && type !== 'guestbook')) {
      return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Permintaan tidak valid.' });
    }

    var ss = resolveSpreadsheet_(slug);
    if (!ss) {
      return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Undangan tidak aktif atau tidak ditemukan.' });
    }

    var guestName = cleanPlainText_(payload.name, 80);
    if (guestName.length < 2) {
      return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Nama minimal 2 karakter.' });
    }

    // Server-side rate limiting (30 detik per slug + nama)
    var cache = CacheService.getScriptCache();
    var rateKey = 'rate_' + slug + '_' + guestName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
    if (cache.get(rateKey)) {
      return jsonResponse_({
        ok: false,
        code: 'RATE_LIMITED',
        message: 'Kiriman Anda baru saja kami terima. Mohon tunggu 30 detik sebelum mengirim lagi.'
      });
    }

    var nowIso = new Date().toISOString();
    var rowValues;
    var targetSheetName;

    if (type === 'rsvp') {
      var attendance = String(payload.attendance || '').trim().toLowerCase();
      if (attendance !== 'hadir' && attendance !== 'tidak_hadir') {
        return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Pilihan kehadiran tidak valid.' });
      }
      var pax = attendance === 'tidak_hadir' ? 0 : parseInt(payload.pax, 10);
      if (isNaN(pax) || (attendance === 'hadir' && (pax < 1 || pax > 10))) {
        return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Jumlah tamu tidak valid.' });
      }
      var notes = cleanPlainText_(payload.notes, 200);

      targetSheetName = 'RSVP';
      rowValues = [nowIso, preventFormulaInjection_(guestName), attendance, pax, preventFormulaInjection_(notes)];
    } else {
      var message = cleanPlainText_(payload.message, 500);
      if (message.length < 3) {
        return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Ucapan minimal 3 karakter.' });
      }

      targetSheetName = 'Guestbook';
      rowValues = [nowIso, preventFormulaInjection_(guestName), preventFormulaInjection_(message), 'FALSE'];
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = ss.getSheetByName(targetSheetName);
      if (!sheet) {
        return jsonResponse_({ ok: false, code: 'SERVER_ERROR', message: 'Tab ' + targetSheetName + ' belum tersedia.' });
      }
      sheet.appendRow(rowValues);
    } finally {
      lock.releaseLock();
    }

    cache.put(rateKey, '1', RATE_LIMIT_TTL);
    return jsonResponse_({ ok: true, code: 'SUCCESS', message: 'Data berhasil disimpan.' });
  } catch (err) {
    return jsonResponse_({ ok: false, code: 'VALIDATION_ERROR', message: 'Mohon lengkapi data dengan benar.' });
  }
}

function resolveSpreadsheet_(slug) {
  var props = PropertiesService.getScriptProperties();
  var registryId = props.getProperty('MASTER_REGISTRY_ID');
  var fallbackSheetId = props.getProperty('CLIENT_SHEET_ID');

  if (!registryId) {
    return fallbackSheetId ? SpreadsheetApp.openById(fallbackSheetId) : null;
  }

  var cache = CacheService.getScriptCache();
  var cacheKey = 'sheet_' + slug;
  var cached = cache.get(cacheKey);

  if (cached) {
    if (cached === 'INACTIVE') return null;
    return SpreadsheetApp.openById(cached);
  }

  var regSs = SpreadsheetApp.openById(registryId);
  var regSheet = regSs.getSheetByName('Registry');
  if (!regSheet) return null;

  var rows = regSheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    var rowSlug = String(rows[i][0] || '').trim().toLowerCase();
    if (rowSlug === slug) {
      var sheetId = String(rows[i][1] || '').trim();
      var status = String(rows[i][2] || '').trim().toUpperCase();
      if (status === 'ACTIVE' && sheetId) {
        cache.put(cacheKey, sheetId, REGISTRY_CACHE_TTL);
        return SpreadsheetApp.openById(sheetId);
      }
      cache.put(cacheKey, 'INACTIVE', REGISTRY_CACHE_TTL);
      return null;
    }
  }

  return null;
}

function sanitizeSlug_(rawSlug) {
  var s = String(rawSlug || '').trim().toLowerCase();
  return /^[a-z0-9-]{3,50}$/.test(s) ? s : '';
}

function cleanPlainText_(value, maxLen) {
  var text = String(value || '').replace(/<[^>]*>/g, '').trim();
  return text.length > maxLen ? text.slice(0, maxLen) : text;
}

function preventFormulaInjection_(text) {
  if (!text) return '';
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function stripLeadingQuote_(text) {
  return text.charAt(0) === "'" ? text.slice(1) : text;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
