import { useContext } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { stripe } from "@/src/lib/stripe";
import Stripe from "stripe";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/product";
import Head from "next/head";
import { CartContext } from "@/src/contexts/CartContext";
import { useRouter } from "next/router";
import { priceFormat } from "@/src/lib/utils";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useContext(CartContext);
  const router = useRouter();

  function handleAddItemButton() {
    addItem(product);
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{priceFormat(Number(product.price))}</span>
          <p>{product.description}</p>

          <button onClick={handleAddItemButton}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_ONureSNhx6fJVS" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;
  const priceInCents = price.unit_amount as number;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceInCents,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
