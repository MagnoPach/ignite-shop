import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

import Stripe from "stripe";
import { stripe } from "@/src/lib/stripe";

import {
  ImageBox,
  ImageContainer,
  ImageList,
  SuccessContainer,
} from "@/src/styles/pages/success";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageList>
          {products.map((product, index) => {
            return (
              <ImageBox key={index}>
                <ImageContainer>
                  <Image
                    src={product.imageUrl}
                    width={120}
                    height={110}
                    alt=""
                  />
                </ImageContainer>
              </ImageBox>
            );
          })}
        </ImageList>

        <p>
          Uhuul! <strong>{customerName}</strong>, sua compra de{" "}
          <strong>{products.length}</strong> camisetas já está a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const costumerName = session.customer_details?.name;

  const line_items = session.line_items?.data;
  const products = line_items?.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      name: product.name,
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      costumerName,
      products,
    },
  };
};
