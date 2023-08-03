"use client";

import React, { forwardRef } from "react";
import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import {
  Button,
  Group,
  Select,
  Switch,
  Text,
  TextInput,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { GarapinRichTextEditor } from "@/components/rich-text-editor";
import { BsPlusCircle } from "react-icons/bs";
import {
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { multipleUploadImage, uploadImage } from "@/firebase/actions";
import { storage } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const PublishApps = () => {
  const { classes } = useStyles();
  const auth = getAuth();
  const router = useRouter();
  const theme = useMantineTheme();
  const inputLogoRef = React.useRef<HTMLInputElement>(null);
  const inputScreenshootsRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);
  const schema = z.object({
    logo: z.object({
      image_name: z.string(),
      full_path: z.string(),
      bucket: z.string(),
      size: z.number(),
      url: z.string().min(8, { message: "Logo is required" }),
    }),
    title: z
      .string()
      .min(2, { message: "Name should have at least 2 letters" }),
    category: z
      .string()
      .min(2, { message: "Category should have at least 2 letters" }),
    description: z.string().min(8, { message: "Description is required" }),
    price: z.string().min(2, { message: "Price is required" }),
    source: z.string().min(8, { message: "Source is required" }),
    support_detail: z
      .string()
      .min(8, { message: "Support Detail is required" }),
    isPublished: z.boolean(),
    base_image: z.string().optional(),
    screenshoots: z
      .array(
        z.object({
          image_name: z.string(),
          full_path: z.string(),
          bucket: z.string(),
          size: z.number(),
          url: z.string(),
        })
      )
      .min(1, { message: "Screenshoots is required" }),
  });

  const form = useForm({
    initialValues: {
      logo: {
        image_name: "",
        full_path: "",
        bucket: "",
        size: 0,
        url: "",
      },
      title: "",
      category: "",
      description: "",
      price: "",
      source: "",
      support_detail: "",
      isPublished: false,
      base_image: "",
      screenshoots: [],
    },

    validate: zodResolver(schema),
  });

  const data = [
    {
      label: "Bussiness App",
      value: "Bussiness App",
    },
    {
      label: "Inventory App",
      value: "Inventory App",
    },
    {
      label: "E-Commerce App",
      value: "E-Commerce App",
    },
    {
      label: "Education App",
      value: "Education App",
    },
    {
      label: "Health App",
      value: "Health App",
    },
    {
      label: "Social App",
      value: "Social App",
    },
    {
      label: "Entertainment App",
      value: "Entertainment App",
    },
    {
      label: "Travel App",
      value: "Travel App",
    },
    {
      label: "Other App",
      value: "Other App",
    },
  ];

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    label: string;
  }

  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    )
  );

  const handleChangeLogo = async (e: any) => {
    if (form.values.logo?.image_name) {
      deleteObject(ref(storage, `images/${form.values.logo?.image_name}`));
    }
    const data = await uploadImage(e.target.files[0]);
    form.setFieldValue("logo", data);
  };

  const handleChangeScreenshoots = async (e: any) => {
    multipleUploadImage(e.target.files).then((data: any) => {
      const newScreenshoots: any = [...form.values.screenshoots, ...data];
      form.setFieldValue("screenshoots", newScreenshoots);
    });
  };

  const deleteImage = (image: any) => {
    const newScreenshoots = form.values.screenshoots.filter(
      (item: any) => item.image_name !== image.image_name
    );
    form.setFieldValue("screenshoots", newScreenshoots);
    deleteObject(ref(storage, `images/${image?.image_name}`));
  };

  const handleSubmit = async (values: {
    title: string;
    category: string;
    description: string;
    price: string;
    source: string;
    support_detail: string;
    isPublished: boolean;
    base_image: string;
  }) => {
    try {
      setBusy(true);
      const res = await axios.post("/api/application", {
        ...values,
        user_id: auth.currentUser?.uid,
      });

      if (res) {
        toast.success("Upload application successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        router.push("/publish");
      }
    } catch (error) {
      toast.error("Upload application failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="p-4 rounded-md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7 space-y-6">
            <div className="mb-6">
              {form.values.logo.url ? (
                <img
                  src={form.values.logo?.url}
                  alt="logo"
                  className="h-20 w-20"
                  onClick={() => {
                    inputLogoRef.current?.click();
                  }}
                />
              ) : (
                <div
                  className="h-20 w-20 bg-white rounded-md mb-2 border-dashed border border-slate-300 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    inputLogoRef.current?.click();
                  }}
                >
                  <FaPlus className="w-6 h-6 text-slate-300" />
                </div>
              )}
              <span className="text-slate-500">
                Upload Logo<span className="text-red-500">*</span>
              </span>
              <input
                type="file"
                ref={inputLogoRef}
                onChange={handleChangeLogo}
                className="hidden"
              />
            </div>
            <TextInput
              withAsterisk
              label="TITLE"
              size="lg"
              disabled={busy}
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              placeholder="Masukkan Nama Aplikasi"
              {...form.getInputProps("title")}
            />
            <Select
              label="CATEGORY"
              placeholder="Pilih Kategori"
              itemComponent={SelectItem}
              data={data}
              withAsterisk
              disabled={busy}
              searchable
              clearable
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              maxDropdownHeight={400}
              nothingFound="Tidak ada data yang ditemukan"
              size="lg"
              filter={(value: any, item: any) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim())
              }
              {...form.getInputProps("category")}
            />
            <div className={`${classes.descriptionEditor}`}>
              <h2 className="mb-2 font-medium text-base text-slate-500">
                DESCRIPTION
              </h2>
              <GarapinRichTextEditor
                content={form.values.description}
                setContent={(e: any) => {
                  form.values.description = e;
                  form.setDirty({
                    description: true,
                  });
                }}
                {...form.getInputProps("description")}
              />
              {form.errors.description && (
                <div className="text-red-500">{form.errors.description}</div>
              )}
            </div>
            <TextInput
              withAsterisk
              label="PRICE/Month"
              size="lg"
              disabled={busy}
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              placeholder="Masukkan harga / bulan"
              {...form.getInputProps("price")}
            />
            <TextInput
              withAsterisk
              label="Source"
              size="lg"
              disabled={busy}
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              placeholder="GIT Repository (public)"
              {...form.getInputProps("source")}
            />
            <TextInput
              label="Base Image"
              size="lg"
              disabled={busy}
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              placeholder="Enter base image"
              {...form.getInputProps("base_image")}
            />
          </div>
          <div className="col-span-5 space-y-6">
            <div className="flex items-center justify-end">
              <Switch
                checked={form.values.isPublished}
                disabled={busy}
                onChange={(event) => {
                  form.values.isPublished = event.currentTarget.checked;
                  form.setDirty({
                    isPublished: true,
                  });
                }}
                color="violet"
                size="md"
                label={
                  form.values.isPublished ? (
                    <span className="text-green-500">PUBLISHED</span>
                  ) : (
                    <span>UNPUBLISHED</span>
                  )
                }
                thumbIcon={
                  form.values.isPublished ? (
                    <AiOutlineCheck size="0.8rem" color="#000" stroke={3} />
                  ) : (
                    <AiOutlineClose
                      size="0.8rem"
                      color={theme.colors.red[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  )
                }
              />
            </div>
            <div className={`${classes.descriptionSupportDetail}`}>
              <h2 className="mb-2 font-medium text-base text-slate-500">
                SUPPORT DETAIL
              </h2>
              <GarapinRichTextEditor
                content={form.values.support_detail}
                setContent={(e: any) => {
                  form.values.support_detail = e;
                  form.setDirty({
                    support_detail: true,
                  });
                }}
                {...form.getInputProps("support_detail")}
              />
              {form.errors.support_detail && (
                <div className="text-red-500">{form.errors.support_detail}</div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-xl mb-2 flex items-center gap-2">
                <span>Screen Shoots</span>
                <BsPlusCircle
                  className="cursor-pointer"
                  onClick={() => {
                    inputScreenshootsRef.current?.click();
                  }}
                />
                <input
                  type="file"
                  name="screenshoots"
                  id="screenshoots"
                  onChange={handleChangeScreenshoots}
                  className="hidden"
                  ref={inputScreenshootsRef}
                  multiple
                />
              </h3>
              <div className="grid grid-cols-12 gap-4">
                {form.values.screenshoots.map((item: any) => (
                  <div
                    key={item.image_name}
                    className="col-span-6 bg-slate-100 rounded-md relative"
                  >
                    <img src={item.url} alt={item.image_name} />
                    <FaTrash
                      className="absolute bottom-2 right-2 cursor-pointer text-red-500"
                      onClick={() => {
                        deleteImage(item);
                      }}
                    />
                  </div>
                ))}

                {form.values.screenshoots.length === 0 && (
                  <div
                    className="col-span-12 bg-slate-100 rounded-md relative"
                    onClick={() => {
                      inputScreenshootsRef.current?.click();
                    }}
                  >
                    <div className="h-40 bg-white rounded-md mb-2 border-dashed border border-slate-300 flex items-center justify-center cursor-pointer">
                      <FaPlus className="w-6 h-6 text-slate-300" />
                    </div>
                  </div>
                )}
              </div>
              {form.errors.screenshoots && (
                <div className="text-red-500">{form.errors.screenshoots}</div>
              )}
            </div>
            <div>
              <Button
                leftIcon={<FaSave className="w-6 h-6" />}
                className="w-full mb-6 bg-[#223CFF] hover:bg-[#223CFF]/80 flex items-center justify-start px-8 gap-4 text-white text-lg rounded-lg py-2 font-normal"
                loading={busy}
                type="submit"
                styles={{
                  inner: {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                loaderPosition="center"
              >
                <p className="text-center w-full">SAVE</p>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PublishApps;

const useStyles = createStyles((theme) => ({
  descriptionEditor: {
    "& .mantine-RichTextEditor-root": {
      "& .mantine-RichTextEditor-content": {
        minHeight: 300,

        "& .ProseMirror": {
          minHeight: 300,
        },
      },
    },
  },
  descriptionSupportDetail: {
    "& .mantine-RichTextEditor-root": {
      "& .mantine-RichTextEditor-content": {
        minHeight: 200,

        "& .ProseMirror": {
          minHeight: 200,
        },
      },
    },
  },
}));
