
const PDFDocument = require("pdfkit");
const ticket = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  ticket_nr: 1234
};

function createTicket(writeStream) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(writeStream);

  generateHeader(doc);
  generateCustomerInformation(doc, ticket);
  generateTicketTable(doc, ticket);
  generateFooter(doc);

  doc.end();
}

function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, ticket) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Ticket", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Ticket Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(ticket.ticket_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Ticket Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(ticket.subtotal - ticket.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(ticket.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(ticket.shipping.address, 300, customerInformationTop + 15)
    .text(
      ticket.shipping.city +
        ", " +
        ticket.shipping.state +
        ", " +
        ticket.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateTicketTable(doc, ticket) {
  let i;
  const ticketTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    ticketTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, ticketTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < ticket.items.length; i++) {
    const item = ticket.items[i];
    const position = ticketTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = ticketTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(ticket.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(ticket.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(ticket.subtotal - ticket.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createTicket
};