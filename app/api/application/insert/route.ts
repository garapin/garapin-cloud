import dbConnect from "@/lib/mongodb";
import { BaseImages, Categories } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const images = [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "MariaDB",
      "Redis",
      "Cassandra",
      "CouchDB",
      "Neo4j",
      "Elasticsearch",
      "RabbitMQ",
      "Kafka",
      "PHP",
      "Python",
      "Node.js",
      "Ruby",
      "Java",
      "Go",
      "C",
      "C++",
      "C#",
      "Scala",
      "Rust",
      "Dart",
      "Kotlin",
      "Swift",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "React",
      "Angular",
      "Vue.js",
      "Ember.js",
      "Svelte",
      "Next.js",
      "Nuxt.js",
      "Gatsby",
      "Django",
      "Flask",
      "Laravel",
      "Spring",
      "Express",
      "Ruby on Rails",
      "ASP.NET",
      "ASP.NET Core",
      "Flutter",
      "React Native",
      "Ionic",
      "Xamarin",
      "NativeScript",
      "Cordova",
      "Electron",
      "Unity",
      "Unreal Engine",
      "Godot",
      "LÖVE",
      "Phaser",
      "PixiJS",
      "Three.js",
      "Babylon.js",
      "A-Frame",
      "Blender",
      "Maya",
      "3ds Max",
      "ZBrush",
      "Substance Painter",
      "Substance Designer",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe XD",
      "Figma",
      "Sketch",
      "InVision",
      "Zeplin",
      "Marvel",
      "Framer",
      "Principle",
      "Flinto",
      "ProtoPie",
      "Origami Studio",
      "Axure",
      "Balsamiq",
      "Webflow",
      "WordPress",
      "Joomla",
      "Drupal",
      "Magento",
      "Shopify",
      "WooCommerce",
      "PrestaShop",
      "OpenCart",
      "BigCommerce",
      "Squarespace",
      "Wix",
      "Weebly",
      "Ghost",
      "Blogger",
      "Jekyll",
      "Hugo",
      "Hexo",
      "Gatsby",
      "Next.js",
      "Nuxt.js",
      "Strapi",
      "Contentful",
      "Prismic",
      "DatoCMS",
      "Sanity",
    ];
    const baseImages = await BaseImages.collection.insertMany(
      images.map((image) => ({ base_image: image }))
    );

    const categories = [
      "Bussiness",
      "Inventory",
      "Ecommerce",
      "Education",
      "Entertainment",
      "Finance",
      "Food & Drink",
      "Games",
      "Health & Fitness",
      "Lifestyle",
      "Medical",
      "Music",
      "Navigation",
      "News",
      "Photo & Video",
      "Productivity",
      "Reference",
      "Social Networking",
      "Sports",
      "Travel",
      "Utilities",
      "Weather",
    ];

    const categoriesData = await Categories.collection.insertMany(
      categories.map((category) => ({ category_name: category }))
    );
    return NextResponse.json({
      message: "Base Images and Categories added successfully",
      data: {
        baseImages,
        categoriesData,
      },
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  await dbConnect();
  try {
    // const baseImages get all
    const base_images = await BaseImages.find({});
    const categories = await Categories.find({});

    return NextResponse.json({
      message: "Base Images and Categories fetched successfully",
      data: {
        base_images,
        categories,
      },
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
