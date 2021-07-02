
const PDFDocument = require("pdfkit");
function createTicket(writeStream, trip, booking) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(writeStream);

  generateHeader(doc);
  generateCustomerInformation(doc, trip, booking);
  generateTicketTable(doc, trip, booking);
  generateFooter(doc);

  doc.end();
}

function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Exclusive Travels", 50, 45)
    .fontSize(10)
    .text("Bohoddar Hut", 200, 45, { align: "right" })
    .text("Chittagong, BD", 200, 65, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, trip, booking) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Ticket Information", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Ticket Number:", 50, customerInformationTop)
    .font("Helvetica")
    .text(booking._id.slice(0, 4), 150, customerInformationTop)
    .font("Helvetica-Bold")
    .text("Ticket Date:", 50, customerInformationTop + 15)
    .font("Helvetica")
    .text(formatDate(new Date(booking.date)), 150, customerInformationTop + 15)
    .font("Helvetica-Bold")
    .text("Departure Time:", 50, customerInformationTop + 30)
    .font("Helvetica")
    .text(trip.deperture_time, 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text("Bus No:", 300, customerInformationTop)
    .font("Helvetica")
    .text(trip.coach_no, 400, customerInformationTop)
    .font("Helvetica-Bold")
    .text("Type:", 300, customerInformationTop + 15)
    .font("Helvetica")
    .text(trip.coach_type, 400, customerInformationTop + 15)
    .moveDown();

  generateHr(doc, 252);
}

function generateTicketTable(doc, trip, booking) {
  let i;
  const ticketTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, ticketTableTop, "#", "Seat", "Route", "Type", "Fare");
  generateHr(doc, ticketTableTop + 20);
  doc.font("Helvetica");
  for (i = 0; i < booking.seat_list.length; i++) {
    const seat = booking.seat_list[i];
    const position = ticketTableTop + (i + 1) * 30;
    generateTableRow(doc, position, i + 1, seat, `${trip.fromStation} To ${trip.toStation}`, trip.coach_type, formatCurrency(trip.fare));
    generateHr(doc, position + 20);
  }

  const subtotalPosition = ticketTableTop + (i + 1) * 30;
  generateTableRow( doc, subtotalPosition, "", "", "Subtotal", "", formatCurrency(trip.fare * booking.seat_list.length));

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow( doc, paidToDatePosition, "", "", "Due", "", formatCurrency(0));

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow( doc, duePosition, "", "", "Total", "", formatCurrency(trip.fare * booking.seat_list.length));
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment has completed. Thank you for being with us.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(doc, y, no, seat, route, type, fare) {
  doc
    .fontSize(10)
    .text(no, 50, y)
    .text(seat, 150, y)
    .text(route, 230, y, { width: 140, align: "left" })
    .text(type, 370, y, { width: 40, align: "right" })
    .text(fare, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(taka) {
  return "BDT " + (parseInt(taka)).toFixed(2);
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