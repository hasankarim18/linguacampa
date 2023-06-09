

const MobileNav = ({ navList }) => {
  return (
    <div className="drawer-side z-20">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4  w-80 text-white h-full bg-darkNavyBlue">{navList}</ul>
    </div>
  );
};

export default MobileNav;