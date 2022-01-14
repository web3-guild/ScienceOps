import { css } from "@emotion/css";
import { pixelScaleImage } from "../../styles/mixins";

export const BlitmapThumbnail = ({
  // @ts-ignore
  tokenContract,
  tokenId,
}: {
  tokenContract: string;
  tokenId: string;
}) => (
  <img
    className={previewImageStyle}
    src={`https://market.blitmap.com/blitmaps-32/${tokenId}.png`}
    alt={`Blitmap #${tokenId}`}
  />
);

const previewImageStyle = css`
  ${pixelScaleImage};
  width: 100%;
  height: 300px;
  margin-bottom: 30px;
`;
