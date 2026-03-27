function NavMenu() {
  return (
    <ul id="menu">
      <center>
        <li data-menuanchor="firstPage">
          <a href="#Home">Home</a>
        </li>
        <li data-menuanchor="secondPage">
          <a href="#rules">Rules</a>
        </li>
        <li data-menuanchor="3rdPage">
          <a href="#Events">Events</a>
        </li>
        <li style={{ margin: 0 }}></li>
        <li data-menuanchor="4thpage">
          <a href="#Registration">Registration</a>
        </li>
        <li data-menuanchor="5thpage">
          <a href="#ContactUs">Contact Us</a>
        </li>
      </center>
    </ul>
  );
}

export default NavMenu;
