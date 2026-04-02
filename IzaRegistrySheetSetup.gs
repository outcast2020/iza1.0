var IZA10_REGISTRY_FOLDER_ID = "1J1P95SAUZfMPsYhCLuLjqcEv5OZP9XNJ";
var IZA10_OFFICIAL_REGISTRY_SPREADSHEET_ID = "12erNrXsDHWBrFYMJNpOs9cdV_R7k02MD2MXhqWjPrmU";
var IZA10_CHECKIN_SPREADSHEET_ID = "130CvfT6mwv0gzYQgmrylg4Q0T5xRI918dms8A4yzqO8";
var IZA10_POEMS_SPREADSHEET_ID = "1XTGgwtYjOepdz3zW8w4RBCBQdwm-bM5BUKMnvCf7fmE";
var IZA10_POEMS_SHEET_NAME = "POEMS";
var IZA10_DEFAULT_REGISTRY_NAME = "IZA 1.0 Registry";

var IZA10_SHEET_ORDER = [
  "records_flat",
  "participants",
  "sessions",
  "session_indicators",
  "repair_events",
  "teacher_notes",
  "consent_events",
  "dashboard",
  "settings"
];

var IZA10_SHEET_SCHEMAS = {
  records_flat: {
    tabColor: "#8B5E3C",
    frozenRows: 1,
    headers: [
      "DATA/HORA",
      "APP_VARIANT",
      "SESSION_ID",
      "PARTICIPANT_ID",
      "CHECKIN_USER_ID",
      "CHECKIN_MATCH_STATUS",
      "CHECKIN_MATCH_METHOD",
      "ESCRITOR/A",
      "EMAIL",
      "MUNICIPIO",
      "ESTADO",
      "ORIGEM",
      "TRILHA",
      "PERSONALIDADE DO BOT",
      "SINTESE DA JORNADA",
      "PALAVRAS-CHAVE",
      "PRESENTE LITERARIO",
      "CREDITO DO PRESENTE",
      "REGISTRO DOS ESCRITOS",
      "RUBRIC_JSON",
      "CHECKLIST_JSON",
      "TURNS_JSON",
      "LOG FECHAMENTO"
    ],
    widths: [160, 120, 160, 160, 150, 150, 150, 200, 220, 160, 110, 150, 150, 180, 320, 200, 320, 200, 420, 240, 220, 240, 220],
    notes: {
      B1: "Set this to iza1.0 for the new parallel track.",
      C1: "Unique journey identifier.",
      D1: "Stable participant identifier across sessions.",
      E1: "User identifier from the check-in spreadsheet when matched.",
      F1: "matched | ambiguous | unmatched",
      G1: "email | name_cohort | name_city | manual | none",
      T1: "Store rubric JSON here for backward-compatible logging.",
      U1: "Store checklist JSON here for backward-compatible logging.",
      V1: "Store turns JSON here for backward-compatible logging."
    },
    validations: {
      F: ["matched", "ambiguous", "unmatched"],
      G: ["email", "name_cohort", "name_city", "manual", "none"]
    }
  },
  participants: {
    tabColor: "#A66B49",
    frozenRows: 1,
    headers: [
      "participant_id",
      "checkin_user_id",
      "match_status",
      "match_method",
      "full_name",
      "email",
      "municipio",
      "estado",
      "origem",
      "teacher_group",
      "first_session_at",
      "last_session_at",
      "sessions_count",
      "consent_current_status",
      "consent_current_version"
    ],
    widths: [170, 150, 130, 130, 220, 220, 160, 100, 150, 150, 160, 160, 120, 170, 170],
    validations: {
      C: ["matched", "ambiguous", "unmatched"],
      D: ["email", "name_cohort", "name_city", "manual", "none"],
      N: ["granted", "updated", "withdrawn", "unknown"]
    }
  },
  sessions: {
    tabColor: "#C17C54",
    frozenRows: 1,
    headers: [
      "session_id",
      "participant_id",
      "started_at",
      "ended_at",
      "track_key",
      "presence_key",
      "presence_mix_json",
      "journey_summary",
      "keywords_csv",
      "final_line",
      "literary_gift_title",
      "literary_gift_author",
      "literary_gift_source",
      "register_status",
      "transcript_txt"
    ],
    widths: [160, 170, 160, 160, 120, 120, 180, 320, 220, 260, 180, 180, 160, 140, 420]
  },
  session_indicators: {
    tabColor: "#D5986E",
    frozenRows: 1,
    headers: [
      "session_id",
      "participant_id",
      "repair_count",
      "best_scene_score",
      "semantic_overlap",
      "socratic_count",
      "mirror_count",
      "closing_words",
      "closing_lines",
      "rubric_total",
      "rubric_fidelidade_ao_passo",
      "rubric_concretude",
      "rubric_retencao_semantica",
      "rubric_qualidade_da_pergunta",
      "rubric_qualidade_do_fechamento",
      "rubric_qualidade_da_sintese_final",
      "check_final_line_strong",
      "check_step_fidelity",
      "check_theme_reflection",
      "completed_session",
      "returned_user"
    ],
    widths: [160, 170, 120, 130, 130, 120, 110, 120, 110, 110, 170, 130, 180, 190, 200, 210, 160, 150, 170, 140, 120]
  },
  repair_events: {
    tabColor: "#E8B78F",
    frozenRows: 1,
    headers: [
      "repair_event_id",
      "session_id",
      "participant_id",
      "step_key",
      "event_type",
      "reason",
      "user_text_excerpt",
      "created_at"
    ],
    widths: [160, 160, 170, 130, 150, 180, 380, 160],
    validations: {
      E: ["repair_needed", "manual_override", "session_anomaly"]
    }
  },
  teacher_notes: {
    tabColor: "#F0C8A9",
    frozenRows: 1,
    headers: [
      "teacher_note_id",
      "participant_id",
      "session_id",
      "teacher_name",
      "note_type",
      "note_text",
      "created_at"
    ],
    widths: [160, 170, 160, 180, 140, 420, 160],
    validations: {
      E: ["celebration", "attention", "follow_up", "pedagogical_note"]
    }
  },
  consent_events: {
    tabColor: "#F7D9C2",
    frozenRows: 1,
    headers: [
      "consent_event_id",
      "participant_id",
      "session_id",
      "timestamp",
      "consent_version",
      "action",
      "source"
    ],
    widths: [170, 170, 160, 160, 160, 130, 150],
    validations: {
      F: ["granted", "updated", "withdrawn"]
    }
  },
  dashboard: {
    tabColor: "#5B3A29",
    frozenRows: 0,
    headers: [],
    widths: [220, 180, 180, 180, 220, 220, 220]
  },
  settings: {
    tabColor: "#3E2723",
    frozenRows: 1,
    headers: ["key", "value", "notes"],
    widths: [220, 320, 420]
  }
};

function createIza10RegistrySpreadsheet() {
  var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "America/Sao_Paulo", "yyyy-MM-dd HH:mm");
  var ss = SpreadsheetApp.create(IZA10_DEFAULT_REGISTRY_NAME + " " + timestamp);
  ensureIza10RegistrySpreadsheet_(ss);
  moveFileToFolder_(ss.getId(), IZA10_REGISTRY_FOLDER_ID);
  applyIza10ScriptProperties_(ss);
  return JSON.stringify({
    ok: true,
    spreadsheetId: ss.getId(),
    url: ss.getUrl(),
    folderId: IZA10_REGISTRY_FOLDER_ID,
    checkinSpreadsheetId: IZA10_CHECKIN_SPREADSHEET_ID
  }, null, 2);
}

function setupIza10RegistryInActiveSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    return createIza10RegistrySpreadsheet();
  }
  ensureIza10RegistrySpreadsheet_(ss);
  applyIza10ScriptProperties_(ss);
  return JSON.stringify({
    ok: true,
    spreadsheetId: ss.getId(),
    url: ss.getUrl(),
    folderId: IZA10_REGISTRY_FOLDER_ID,
    checkinSpreadsheetId: IZA10_CHECKIN_SPREADSHEET_ID
  }, null, 2);
}

function setupIza10OfficialRegistrySpreadsheet() {
  var ss = SpreadsheetApp.openById(IZA10_OFFICIAL_REGISTRY_SPREADSHEET_ID);
  ensureIza10RegistrySpreadsheet_(ss);
  applyIza10ScriptProperties_(ss);
  return JSON.stringify({
    ok: true,
    spreadsheetId: ss.getId(),
    url: ss.getUrl(),
    folderId: IZA10_REGISTRY_FOLDER_ID,
    checkinSpreadsheetId: IZA10_CHECKIN_SPREADSHEET_ID,
    poemsSpreadsheetId: IZA10_POEMS_SPREADSHEET_ID
  }, null, 2);
}

function ensureIza10RegistrySpreadsheet_(ss) {
  if (!ss) {
    throw new Error("No active spreadsheet was found. Run createIza10RegistrySpreadsheet() in a standalone Apps Script project, or bind the script to a spreadsheet before running setupIza10RegistryInActiveSpreadsheet().");
  }
  for (var i = 0; i < IZA10_SHEET_ORDER.length; i++) {
    var name = IZA10_SHEET_ORDER[i];
    var sheet = getOrCreateSheet_(ss, name, i);
    applySheetSchema_(sheet, IZA10_SHEET_SCHEMAS[name]);
  }
  cleanupDefaultSheets_(ss);
  seedDashboardSheet_(ss.getSheetByName("dashboard"));
  seedSettingsSheet_(ss.getSheetByName("settings"), ss);
}

function getOrCreateSheet_(ss, name, index) {
  var existing = ss.getSheetByName(name);
  if (existing) return existing;

  var sheets = ss.getSheets();
  if (index === 0 && sheets.length === 1 && isDisposableDefaultSheet_(sheets[0])) {
    sheets[0].setName(name);
    return sheets[0];
  }

  return ss.insertSheet(name, index);
}

function isDisposableDefaultSheet_(sheet) {
  if (!sheet) return false;
  var name = String(sheet.getName() || "");
  var isDefaultName = /^(Sheet\d*|Planilha\d*)$/i.test(name);
  return isDefaultName && sheet.getLastRow() <= 1 && sheet.getLastColumn() <= 1;
}

function cleanupDefaultSheets_(ss) {
  var sheets = ss.getSheets();
  for (var i = sheets.length - 1; i >= 0; i--) {
    var sheet = sheets[i];
    if (IZA10_SHEET_ORDER.indexOf(sheet.getName()) === -1 && isDisposableDefaultSheet_(sheet)) {
      ss.deleteSheet(sheet);
    }
  }
}

function applySheetSchema_(sheet, schema) {
  if (!sheet || !schema) return;

  if (schema.tabColor) sheet.setTabColor(schema.tabColor);
  sheet.setFrozenRows(schema.frozenRows || 0);
  sheet.setHiddenGridlines(sheet.getName() === "dashboard");

  if (schema.headers && schema.headers.length) {
    ensureHeaderRow_(sheet, schema.headers);
    styleHeaderRow_(sheet, schema.headers.length);
    applyColumnWidths_(sheet, schema.widths || []);
    applyHeaderNotes_(sheet, schema.notes || {});
    applyBanding_(sheet, schema.headers.length);
    applyFilter_(sheet, schema.headers.length);
    applyValidations_(sheet, schema.validations || {});
  } else {
    applyColumnWidths_(sheet, schema.widths || []);
  }
}

function ensureHeaderRow_(sheet, headers) {
  var width = headers.length;
  if (sheet.getMaxColumns() < width) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), width - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, 1, width).setValues([headers]);
}

function styleHeaderRow_(sheet, width) {
  var range = sheet.getRange(1, 1, 1, width);
  range
    .setBackground("#4E342E")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 30);
}

function applyColumnWidths_(sheet, widths) {
  for (var i = 0; i < widths.length; i++) {
    if (widths[i]) sheet.setColumnWidth(i + 1, widths[i]);
  }
}

function applyHeaderNotes_(sheet, notes) {
  var keys = Object.keys(notes || {});
  for (var i = 0; i < keys.length; i++) {
    sheet.getRange(keys[i]).setNote(notes[keys[i]]);
  }
}

function applyBanding_(sheet, width) {
  var maxRows = Math.max(sheet.getMaxRows(), 200);
  var range = sheet.getRange(1, 1, maxRows, width);
  var bandings = sheet.getBandings();
  for (var i = 0; i < bandings.length; i++) {
    bandings[i].remove();
  }
  range.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
}

function applyFilter_(sheet, width) {
  var existing = sheet.getFilter();
  if (existing) existing.remove();
  sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 2), width).createFilter();
}

function applyValidations_(sheet, validations) {
  var columns = Object.keys(validations || {});
  for (var i = 0; i < columns.length; i++) {
    var columnLetter = columns[i];
    var values = validations[columnLetter];
    var columnIndex = columnLetterToIndex_(columnLetter);
    if (!columnIndex || !values || !values.length) continue;

    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(values, true)
      .setAllowInvalid(true)
      .build();

    var maxRows = Math.max(sheet.getMaxRows() - 1, 1);
    sheet.getRange(2, columnIndex, maxRows, 1).setDataValidation(rule);
  }
}

function seedDashboardSheet_(sheet) {
  if (!sheet) return;

  sheet.clear();
  sheet.getRange("A1:G30").clearFormat();
  applyColumnWidths_(sheet, IZA10_SHEET_SCHEMAS.dashboard.widths);

  sheet.getRange("A1").setValue("IZA 1.0 Teacher Dashboard").setFontSize(16).setFontWeight("bold").setFontColor("#4E342E");
  sheet.getRange("A2").setValue("Fast operational readout for the parallel IZA 1.0 track.").setFontColor("#6D4C41");

  sheet.getRange("A4").setValue("Metric").setFontWeight("bold").setBackground("#4E342E").setFontColor("#FFFFFF");
  sheet.getRange("B4").setValue("Value").setFontWeight("bold").setBackground("#4E342E").setFontColor("#FFFFFF");

  var labels = [
    ["Total participants", '=COUNTA(participants!A2:A)'],
    ["Total sessions", '=COUNTA(sessions!A2:A)'],
    ["Rows matched to check-in", '=COUNTIF(records_flat!F2:F,"matched")'],
    ["Rows with literary gift", '=COUNTIF(records_flat!Q2:Q,"<>")'],
    ["Average repair count", '=IFERROR(AVERAGE(session_indicators!C2:C),0)'],
    ["Average rubric total", '=IFERROR(AVERAGE(session_indicators!J2:J),0)']
  ];
  sheet.getRange(5, 1, labels.length, 2).setValues(labels);

  sheet.getRange("D4").setValue("Sessions by Track").setFontWeight("bold").setBackground("#4E342E").setFontColor("#FFFFFF");
  sheet.getRange("D5").setFormula("=QUERY(records_flat!A:W,\"select M, count(M) where M is not null group by M label M 'Track', count(M) 'Sessions'\",1)");

  sheet.getRange("D12").setValue("Sessions by Presence").setFontWeight("bold").setBackground("#4E342E").setFontColor("#FFFFFF");
  sheet.getRange("D13").setFormula("=QUERY(records_flat!A:W,\"select N, count(N) where N is not null group by N label N 'Presence', count(N) 'Sessions'\",1)");

  sheet.getRange("D20").setValue("Check-in Match Status").setFontWeight("bold").setBackground("#4E342E").setFontColor("#FFFFFF");
  sheet.getRange("D21").setFormula("=QUERY(records_flat!A:W,\"select F, count(F) where F is not null group by F label F 'Match Status', count(F) 'Rows'\",1)");

  sheet.getRange("A4:B10").setBorder(true, true, true, true, true, true);
  sheet.getRange("D4:E10").setBorder(true, true, true, true, true, true);
  sheet.getRange("D12:E18").setBorder(true, true, true, true, true, true);
  sheet.getRange("D20:E26").setBorder(true, true, true, true, true, true);
}

function seedSettingsSheet_(sheet, ss) {
  if (!sheet) return;

  sheet.clear();
  ensureHeaderRow_(sheet, IZA10_SHEET_SCHEMAS.settings.headers);
  styleHeaderRow_(sheet, IZA10_SHEET_SCHEMAS.settings.headers.length);
  applyColumnWidths_(sheet, IZA10_SHEET_SCHEMAS.settings.widths);

  var values = [
    ["APP_VARIANT", "iza1.0", "Parallel track identifier"],
    ["REGISTRY_SPREADSHEET_ID", ss.getId(), "Main spreadsheet for IZA 1.0"],
    ["REGISTRY_SPREADSHEET_URL", ss.getUrl(), "Open this sheet in the browser"],
    ["OFFICIAL_REGISTRY_SPREADSHEET_ID", IZA10_OFFICIAL_REGISTRY_SPREADSHEET_ID, "Canonical registry for IZA 1.0"],
    ["REGISTRY_FOLDER_ID", IZA10_REGISTRY_FOLDER_ID, "Target Google Drive folder"],
    ["CHECKIN_SPREADSHEET_ID", IZA10_CHECKIN_SPREADSHEET_ID, "Workshop check-in source"],
    ["CHECKIN_SPREADSHEET_URL", "https://docs.google.com/spreadsheets/d/" + IZA10_CHECKIN_SPREADSHEET_ID, "Check-in sheet link"],
    ["RECORDS_SHEET_NAME", "records_flat", "Legacy-compatible intake tab"],
    ["PARTICIPANTS_SHEET_NAME", "participants", "Participant registry"],
    ["SESSIONS_SHEET_NAME", "sessions", "Session registry"],
    ["SESSION_INDICATORS_SHEET_NAME", "session_indicators", "Structured indicators"],
    ["REPAIR_EVENTS_SHEET_NAME", "repair_events", "Only meaningful repair events"],
    ["TEACHER_NOTES_SHEET_NAME", "teacher_notes", "Teacher annotations"],
    ["CONSENT_EVENTS_SHEET_NAME", "consent_events", "Consent audit trail"],
    ["POEMS_SPREADSHEET_ID", IZA10_POEMS_SPREADSHEET_ID, "Poem base for IZA 1.0"],
    ["POEMS_SHEET_NAME", IZA10_POEMS_SHEET_NAME, "Default poems tab name"]
  ];

  sheet.getRange(2, 1, values.length, 3).setValues(values);
  sheet.hideSheet();
}

function applyIza10ScriptProperties_(ss) {
  var props = PropertiesService.getScriptProperties();
  props.setProperties({
    IZA_RECORDS_SPREADSHEET_ID: ss.getId(),
    IZA_RECORDS_SHEET_NAME: "records_flat",
    IZA_CHECKIN_SPREADSHEET_ID: IZA10_CHECKIN_SPREADSHEET_ID,
    IZA_CHECKIN_SHEET_NAME: "",
    IZA_PROJECT_VARIANT: "iza1.0",
    IZA_POEMS_SPREADSHEET_ID: IZA10_POEMS_SPREADSHEET_ID,
    IZA_POEMS_SHEET_NAME: IZA10_POEMS_SHEET_NAME
  }, true);
}

function moveFileToFolder_(fileId, folderId) {
  if (!fileId || !folderId) return;

  var file = DriveApp.getFileById(fileId);
  var folder = DriveApp.getFolderById(folderId);
  folder.addFile(file);

  var parents = file.getParents();
  while (parents.hasNext()) {
    var parent = parents.next();
    if (parent.getId() !== folderId) {
      parent.removeFile(file);
    }
  }
}

function columnLetterToIndex_(letters) {
  var text = String(letters || "").toUpperCase().replace(/[^A-Z]/g, "");
  if (!text) return 0;
  var value = 0;
  for (var i = 0; i < text.length; i++) {
    value = value * 26 + (text.charCodeAt(i) - 64);
  }
  return value;
}
