export const Action = (type, payload) => ({type, payload});

export const URL = (page) => {
 return `https://picsum.photos/v2/list?page=${page}&perPage=10`;
};

export const IMAGE_URL = (id) => {
  return `https://picsum.photos/200/300?image=${id}`;
};

