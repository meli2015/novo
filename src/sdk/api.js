export const BASE_URL = "https://mangabr-apitop.vercel.app";

export async function getClassified() {
  return fetch(`${BASE_URL}/home/classificados`).then((res) => res.json());
}

export async function getRecent({ page = 1 } = {}) {
  return fetch(`${BASE_URL}/home/atualizacoes?page=${page}`).then((res) =>
    res.json()
  );
}

export async function getAllMangas({ page = 1 } = {}) {
  return fetch(`${BASE_URL}/mangas/lista?page=${page}`).then((res) =>
    res.json()
  );
}

export async function getMangaDetails({ link } = {}) {
  return fetch(`${BASE_URL}/mangas/detalhes?link=${link}`).then((res) =>
    res.json()
  );
}

export async function getMangaChapters({ link } = {}) {
  return fetch(`${BASE_URL}/mangas/episodios?link=${link}`).then((res) =>
    res.json()
  );
}

export async function getChapter({ link, page = 1 } = {}) {
  return fetch(`${BASE_URL}/mangas/capitulos?link=${link}&page=/${page}`).then(
    (res) => res.json()
  );
}

export async function searchManga({ name }) {
  return fetch(`${BASE_URL}/home/pesquisar?name=${name}`).then((res) =>
    res.json()
  );
}

/* =========================== */

export const mount = {
  pagination: (response) => ({
    totalPages: response?.totalPages,
    pageSize: response?.itemsPerPage,
  }),
  recent: (response) => ({
    data: response?.latestUpdatesList?.map((item) => ({
      title: item.title,
      image: item.img,
      link: item.link,
      published_at: item.data,
      href: `/details?link=${item.link}`,
    })),
    error: null,
    currentPage: response?.page,
    totalPages: response?.totalPages,
    pageSize: response?.itemsPerPage,
  }),
  allMangas: (response) => ({
    data: response?.popularMangas?.map((item) => ({
      title: item.title,
      image: item.img,
      link: item.link,
      published_at: item.data,
      href: `/details?link=${item.link}`,
    })),
    error: null,
    currentPage: response?.page,
    totalPages: response?.totalPages,
    pageSize: response?.itemsPerPage,
  }),
  classified: (response) => ({
    data: response?.map((item) => ({
      title: item.title,
      image: item.img,
      link: item.link,
      published_at: item.data,
      href: `/details?link=${item.link}`,
    })),
  }),
  mangaDetails: (response) => {
    return {
      error: !!response?.error,
      data: {
        title: response?.title,
        description: response?.sinopse,
        image: response?.img,
        tags: response?.categorias?.map((item) => item?.name),
      },
    };
  },
  mangaChapters: (response) => {
    return {
      error: !!response?.error,
      data: response?.episodios?.map((item, index, array) => ({
        id: array.length - index,
        title: item.chapter,
        link: item.url,
      })),
    };
  },
  search: (response) => {
    return {
      error: !!response?.error,
      data: Array.isArray(response)
        ? response?.map((item) => ({
            title: item.title,
            image: item.img,
            link: item.link,
            href: `/details?link=${item.link}`,
          }))
        : [],
    };
  },
};