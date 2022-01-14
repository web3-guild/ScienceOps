import { NFTFullPage, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";

import { PageWrapper } from "../../../styles/components";
import Head from "../../../components/head";

const styles = {
  theme: {
    lineSpacing: 24,
    linkColor: "var(--black)",
  },
};

type PieceProps = {
  name: string;
  description: string;
  image: string;
  initialData: any;
};

const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE;

export default function Piece({
  name,
  description,
  image,
  initialData,
}: PieceProps) {
  const { query } = useRouter();

  return (
    <>
      <Head
        title={`${name} | ${APP_TITLE}`}
        description={description}
        ogImage={image}
      />
      <MediaConfiguration
        networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}
        style={styles}
      >
        <PageWrapper>
          <NFTFullPage id={query.id as string} initialData={initialData} />
        </PageWrapper>
      </MediaConfiguration>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const fetcher = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK as NetworkIDs
  );

  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }

  const id = params.id as string;
  const contract = params.contract as string;

  const data = await FetchStaticData.fetchNFTData({
    tokenId: id,
    contractAddress: contract,
    fetchAgent: fetcher,
  });

  const { name, description } = data.metadata;

  return {
    props: {
      id,
      name,
      description,
      image:
        ("zoraNFT" in data.nft
          ? data.nft.zoraNFT.contentURI
          : data.metadata.image_uri) || null,
      initialData: data,
    },
  };
};
