/**
 * HomeFlow Leads - Google Apps Script Web App
 * ============================================
 * Deploy this as a Google Apps Script Web App.
 *
 * HOW TO DEPLOY:
 * 1. Go to https://script.google.com/ -> New Project
 * 2. Paste this entire file
 * 3. Update SPREADSHEET_ID with your Google Sheet ID
 * 4. Save -> Deploy -> New Deployment -> Web App
 * 5. Set "Execute as: Me", "Who has access: Anyone"
 * 6. Copy the Web App URL -> paste as WEBHOOK_URL in page.tsx
 *
 * WEBHOOK_URL example: "https://script.google.com/macros/s/abcdef123/exec"
 */

var SPREADSHEET_ID = "1Ibw70IdkSOcJFxxQQSMSCZOpGHGhL0bAah2fZQtOB3Y";
var SHEET_NAME = "LEAD";
var YOUR_EMAIL = "fouadhaidouri@gmail.com";
var HEADERS = [
  "Timestamp", "Type", "First Name", "Last Name", "Company",
  "Email", "Phone", "Services", "Plan", "Located in US", "Zip Code",
  "Employees", "Website", "Budget", "Notes", "Message"
];

function doPost(e) {
  try {
    // Parse JSON from the 'payload' form field (sent as application/x-www-form-urlencoded)
    var data = JSON.parse(e.parameter.payload);

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header row if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp", "Type", "First Name", "Last Name", "Company",
        "Email", "Phone", "Services", "Plan", "Located in US", "Zip Code",
        "Employees", "Website", "Budget", "Notes", "Message"
      ]);
    } else {
      var existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (existingHeaders.indexOf("Plan") === -1) {
        sheet.insertColumnAfter(8);
        sheet.getRange(1, 9).setValue("Plan");
      }
    }
    }

    var timestamp = new Date().toISOString();

    if (data.type === "application") {
      sheet.appendRow([
        timestamp,
        "Application",
        data.firstName || "",
        data.lastName || "",
        data.company || "",
        data.email || "",
        data.phone || "",
        (data.services || []).join(", "),
        data.plan || "",
        data.locatedUS || "",
        data.zip || "",
        data.employees || "",
        data.website || "",
        data.budget || "",
        data.notes || "",
        ""
      ]);

      GmailApp.sendEmail(YOUR_EMAIL, "New Application - HomeFlow Leads",
        "New application received:\n\n" +
        "Name: " + data.firstName + " " + data.lastName + "\n" +
        "Company: " + data.company + "\n" +
        "Email: " + data.email + "\n" +
        "Phone: " + data.phone + "\n" +
        "Services: " + (data.services || []).join(", ") + "\n" +
        "Plan: " + (data.plan || "N/A") + "\n" +
        "Located in US: " + data.locatedUS + "\n" +
        "Zip: " + data.zip + "\n" +
        "Employees: " + data.employees + "\n" +
        "Website: " + data.website + "\n" +
        "Budget: " + data.budget + "\n" +
        "Notes: " + (data.notes || "N/A") + "\n\n" +
        "View sheet: https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID
      );

    } else if (data.type === "chat") {
      sheet.appendRow([
        timestamp,
        "Chat",
        data.name || "",
        "",
        "",
        data.email || "",
        data.phone || "",
        "",
        data.plan || "",
        "",
        "",
        "",
        "",
        "",
        data.message || ""
      ]);

      GmailApp.sendEmail(YOUR_EMAIL, "New Chat Inquiry - HomeFlow Leads",
        "New chat inquiry received:\n\n" +
        "Name: " + data.name + "\n" +
        "Email: " + data.email + "\n" +
        "Phone: " + data.phone + "\n" +
        "Message: " + (data.message || "N/A") + "\n\n" +
        "View sheet: https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID
      );
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "alive" }))
    .setMimeType(ContentService.MimeType.JSON);
}
