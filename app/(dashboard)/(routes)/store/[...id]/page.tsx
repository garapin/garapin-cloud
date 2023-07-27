import { DownloadIconSVG } from "@/app/assets/icons/DownloadIcon";
import React from "react";

const DetailStoreApps = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="flex gap-4 mb-10">
            <div className="h-20 w-20 bg-slate-100"></div>
            <div className="flex-1">
              <h2 className="text-4xl">SolidInvoice</h2>
              <p className="text-slate-500 mb-2">By SolidWorx</p>
              <p className="mb-2">Version 2.0.3</p>
              <div className="bg-slate-500 w-fit px-2 py-1 rounded-sm font-medium text-white">
                BUSINESS APPS
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
              magni ipsa mollitia perferendis debitis ad ullam explicabo quaerat
              facilis enim sapiente alias distinctio aliquid ipsum, similique
              vel maiores doloribus rem. Tempore recusandae at repellendus sint
              dolorum quas facilis commodi blanditiis necessitatibus obcaecati
              tenetur libero ducimus accusantium minima, consequuntur quasi
              labore vitae rerum saepe culpa veritatis, soluta repellat
              asperiores? Sequi commodi sint illo alias autem quae culpa
              tempora! Ratione quos asperiores hic odit rerum? Quos, illo
              officia non consequatur blanditiis repudiandae totam recusandae,
              cupiditate doloremque ducimus odio? Totam repellat dolorem,
              accusantium minus consequuntur nihil minima ea, ad cum neque dicta
              aperiam? Totam voluptatem sit, consequuntur illum earum ipsum
              aliquid molestias delectus maxime optio expedita deserunt amet
              mollitia recusandae sed voluptate tempore nobis.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Software Included</h2>
            <table className="w-full border rounded-md">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-slate-200 font-medium">
                    Package
                  </th>
                  <th className="text-left p-4 bg-slate-200 font-medium">
                    Version
                  </th>
                  <th className="text-left p-4 bg-slate-200 font-medium">
                    License
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item}>
                    <td className="p-4">Inventory System</td>
                    <td className="p-4">2.0.3</td>
                    <td className="p-4">MIT</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-4">
          <div className="max-w-xs mx-auto mb-10">
            <button className="w-full mb-6 bg-[#223CFF] hover:bg-[#223CFF]/80 flex items-center h-16 justify-start px-8 gap-4 text-white rounded-lg py-2 text-2xl">
              <DownloadIconSVG className="w-15 h-15" />
              <p className="text-center w-full">Install Now</p>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-xl mb-4">Support Details</h3>
            <p>Supported by: SolidWorx</p>
            <p>
              Support URL:{" "}
              <a href="#" className="text-blue-500">
                https://docs.solidinvoice.com/
              </a>
            </p>
            <p>
              Supprot Email:{" "}
              <a href="#" className="text-blue-500">
                support@solidworx.com
              </a>
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-medium text-xl mb-2">Price</h3>
            <p className="text-xl font-light">Rp. 125.000/Month</p>
          </div>
          <div>
            <h3 className="font-medium text-xl mb-2">Screenshoots</h3>
            <div className="grid grid-cols-12 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="col-span-6 bg-slate-100 rounded-md"
                >
                  <img src="/images/sc-placeholder.png" alt="data" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStoreApps;
