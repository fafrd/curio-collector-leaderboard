function Addresses({ addrs, ens, selected, title, callback }) {
  if (!addrs || addrs.length === 0) return null;

  return (
    <>
      <header key={title}>{title} Card Addresses</header>
      {addrs.map((address) => {
        const isSelected = selected === address;
        const addrOrEns = ens[address] || address;
        return (
          <button
            id={address}
            key={address}
            className={"address " + (isSelected ? "selected" : "")}
            onClick={callback}
          >
            <span>{addrOrEns}</span>
            <div className={"arrow " + (isSelected ? "selected" : "")}>---&gt;</div>
          </button>
        );
      })}
    </>
  );
}

export default Addresses;
