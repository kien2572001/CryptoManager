const Dashbroad = () => {
  return (
    <div className="max-w-screen-xl mx-auto bg-blue-500  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/*Total balance  */}
      <div className="card-container text-[#ffffffe6] flex flex-col">
        <div className="leading-[30px]">Total Balance</div>
        <div className="text-4xl font-bold leading-[54px]">$ 764.61</div>
        <div>in BTC 0.00000000</div>
        <div className="block border-b mt-[25px] border-b-white"></div>
        <div className="mt-4">All Time max</div>
        <div className="text-xl font-bold leading-[30px] mt-3">$ 764.61</div>
        <div className="mt-4">All Time min</div>
        <div className="text-xl font-bold leading-[30px] mt-3">$ 764.61</div>
        <div className="block border-b mt-[16px] mb-[25px] border-b-white"></div>
        <div className="">Total assets: 8</div>
      </div>
      {/* Wallet */}
      <div className=" grid grid-rows-2 gap-5">
        {/* Top wallets */}
        <div className="card-container-with-bottom-button text-[#ffffffe6] flex flex-col p-0">
          <div className="p-4">
            <div className="leading-[30px] text-xl">Total Wallet</div>
            <div className="mt-6">$ 764.61</div>
            <div className="mt-3 text-xs text-[#3571FD]">0 wallets | 0 assets</div>
          </div>
          <button className="flex items-center justify-center bg-[#162348] text-[#3571FD] py-2 px-3 h-[50px] rounded-b-[15px]">
            + Add Wallet
          </button>
        </div>
        {/* top porfolios */}
        <div className="card-container-with-bottom-button text-[#ffffffe6] flex flex-col p-0">
          <div className="p-4">
            <div className="leading-[30px] text-xl">Total Wallet</div>
            <div className="mt-6">$ 764.61</div>
            <div className="mt-3 text-xs text-[#3571FD]">0 wallets | 0 assets</div>
          </div>
          <button className="flex items-center justify-center bg-[#162348] text-[#3571FD] py-2 px-3 h-[50px] rounded-b-[15px]">
            + Add Wallet
          </button>
        </div>
      </div>
      <div>3</div>
      <div>4</div>
    </div>
  );
};

export default Dashbroad;
