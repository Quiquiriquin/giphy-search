export type GifCardType = {
  title: string;
  url: string;
};

export type GifResponse = {
  title: string;
  images: {
    preview_gif: {
      url: string;
    };
  };
};

export const extractGifRequiredData = (info: any): GifCardType[] => {
  return info?.map(
    ({
      title,
      images: {
        preview_gif: { url },
      },
    }: GifResponse) => ({
      title,
      url,
    })
  );
};
