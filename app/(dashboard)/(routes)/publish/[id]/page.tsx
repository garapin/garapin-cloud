"use client";

import React, { forwardRef } from "react";
import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import { FaSave } from "react-icons/fa";
import { Avatar, Group, Select, Text, TextInput } from "@mantine/core";

const PublishApps = () => {
  const schema = z.object({
    title: z
      .string()
      .min(2, { message: "Name should have at least 2 letters" }),
    category: z
      .string()
      .min(2, { message: "Name should have at least 2 letters" }),
  });

  const form = useForm({
    initialValues: {
      title: "",
    },

    validate: zodResolver(schema),
  });

  const data = [
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Bender Bending Rodríguez",
      value: "Bender Bending Rodríguez",
      description: "Fascinated with cooking",
    },

    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Carol Miller",
      value: "Carol Miller",
      description: "One of the richest people on Earth",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      label: "Homer Simpson",
      value: "Homer Simpson",
      description: "Overweight, lazy, and often ignorant",
    },
    {
      image:
        "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
      label: "Spongebob Squarepants",
      value: "Spongebob Squarepants",
      description: "Not just a sponge",
    },
  ];

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
    description: string;
  }

  // eslint-disable-next-line react/display-name   
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <div className="p-4 rounded-md">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <div className="mb-6">
              <div className="h-20 w-20 bg-white rounded-md mb-2"></div>
              <span className="text-slate-500">Upload Logo</span>
            </div>
            <div className="mb-6">
              <TextInput
                withAsterisk
                label="TITLE"
                size="lg"
                labelProps={{ className: "mb-2 font-medium text-base text-slate-500" }}
                placeholder="Masukkan Nama Aplikasi"
                {...form.getInputProps("title")}
              />
            </div>
            <div className="mb-6">
              <Select
                label="CATEGORY"
                placeholder="Pilih Kategori"
                itemComponent={SelectItem}
                data={data}
                withAsterisk
                searchable
                clearable
                labelProps={{ className: "mb-2 font-medium text-base text-slate-500" }}
                maxDropdownHeight={400}
                nothingFound="Tidak ada data yang ditemukan"
                size="lg"
                filter={(value: any, item: any) =>
                  item.label
                    .toLowerCase()
                    .includes(value.toLowerCase().trim()) ||
                  item.description
                    .toLowerCase()
                    .includes(value.toLowerCase().trim())
                }
                {...form.getInputProps("category")}
              />
            </div>
            
          </div>
          <div className="col-span-4">
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
            <div>
              <button
                type="submit"
                className="flex justify-center w-full items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 py-2 rounded-md text-white"
              >
                <FaSave className="w-6 h-6 text-white" />
                <span>SAVE</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PublishApps;
