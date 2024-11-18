const MainPage = (props) => {
  const ticketId = props.ticketId || "No ticket ID provided!";
  return <div>Ticket ID: {ticketId}</div>;
};
export default MainPage;
