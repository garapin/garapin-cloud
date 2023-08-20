"use client";

import React, { forwardRef, useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import {
  Button,
  Group,
  LoadingOverlay,
  Select,
  Switch,
  Text,
  TextInput,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { GarapinRichTextEditor } from "@/components/rich-text-editor";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { multipleUploadImage, uploadImage } from "@/firebase/actions";
import { storage } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

const PublishApps = () => {
  const { classes } = useStyles();
  const auth = getAuth();
  const [id, setId] = React.useState<any>(null);
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const router = useRouter();
  const theme = useMantineTheme();
  const inputLogoRef = React.useRef<HTMLInputElement>(null);
  const inputScreenshootsRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<any>({
    categories: [],
    base_images: [],
  });
  const schema = z.object({
    logo: z.object({
      image_name: z.string(),
      full_path: z.string().optional(),
      bucket: z.string().optional(),
      size: z.number().optional(),
      url: z.string().min(8, { message: "Logo is required" }),
    }),
    title: z
      .string()
      .min(2, { message: "Name should have at least 2 letters" }),
    category: z
      .string()
      .min(2, { message: "Category should have at least 2 letters" }),
    description: z.string().min(8, { message: "Description is required" }),
    price: z.number().min(50000, { message: "At least 50.000" }).nullable(),
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
          full_path: z.string().optional(),
          bucket: z.string().optional(),
          size: z.number().optional(),
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
      price: 0,
      source: "",
      support_detail: "",
      isPublished: false,
      base_image: "",
      screenshoots: [],
    },

    validate: zodResolver(schema),
  });

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
    price: Number;
    source: string;
    support_detail: string;
    isPublished: boolean;
    base_image: string;
  }) => {
    try {
      setBusy(true);
      let res = null;
      if (slug === "new") {
        res = await axios.post("/api/application", {
          ...values,
          user_id: auth.currentUser?.uid,
        });
      } else {
        res = await axios.put("/api/application", {
          ...values,
          id: id,
          user_id: auth.currentUser?.uid,
        });
      }

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

  const getAppDetail = async () => {
    try {
      setLoading(true);
      const data = await axios.get(`/api/store/${slug}`);
      if (data) {
        form.setValues({
          logo: {
            image_name: data.data.logo.name,
            url: data.data.logo.url,
            bucket: data.data.logo.bucket,
            full_path: data.data.logo.full_path,
            size: data.data.logo.size,
          },
          title: data.data.title,
          category: data.data.category,
          description: data.data.description,
          price: data.data.price,
          source: data.data.source,
          support_detail: data.data.support_detail,
          isPublished: Boolean(data.data.status === "Published"),
          base_image: data.data.base_image,
          screenshoots: data.data.screenshoots.map((item: any) => ({
            image_name: item.name,
            url: item.url,
            bucket: item.bucket,
            full_path: item.full_path,
            size: item.size,
          })),
        });

        setId(data.data._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetBaseImageAndCategories = async () => {
    try {
      const res = await axios.get("/api/application/insert");
      setOptions({
        ...options,
        categories: res.data.data.categories.map((item: any) => ({
          label: item.category_name,
          value: item.category_name,
        })),
        base_images: res.data.data.base_images.map((item: any) => ({
          label: item.base_image,
          value: item.base_image,
        })),
      });
    } catch (error) {
      console.log("errors", error);
    }
  };

  useEffect(() => {
    if (slug !== "new") {
      getAppDetail();
    }
    handleSetBaseImageAndCategories();
  }, []);

  return (
    <div className="p-4 rounded-md">
      <LoadingOverlay visible={loading} overlayBlur={2} />
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
              data={options.categories}
              withAsterisk
              disabled={busy}
              searchable
              clearable
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              nothingFound="Tidak ada data yang ditemukan"
              size="lg"
              {...form.getInputProps("category")}
            />
            <div className={`${classes.descriptionEditor}`}>
              <h2 className="mb-2 font-medium text-base text-slate-500">
                DESCRIPTION
              </h2>
              <GarapinRichTextEditor
                content={form.values.description}
                loading={loading}
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
              type="number"
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              placeholder="Masukkan harga / bulan"
              {...form.getInputProps("price")}
              onChange={(e) => {
                if (e.target.value) {
                  form.values.price = Number(e.target.value);
                } else {
                  form.values.price = "" as any;
                }
                form.setDirty({
                  price: true,
                });
                form.setTouched({
                  price: true,
                });
                form.setErrors({
                  price: form.values.price < 50000 ? "At least 50.000" : "",
                });
              }}
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
            <Select
              label="Base Image"
              placeholder="Pilih Base Image"
              data={options.base_images}
              withAsterisk
              disabled={busy}
              searchable
              clearable
              labelProps={{
                className: "mb-2 font-medium text-base text-slate-500",
              }}
              nothingFound="Tidak ada data yang ditemukan"
              size="lg"
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
                loading={loading}
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
                <span>Screenshots</span>
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
                size="lg"
                styles={{
                  inner: {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                loaderPosition="center"
              >
                <p className="text-center w-full">Save</p>
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
