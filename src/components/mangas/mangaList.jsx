import { List } from "@/components/list";
import { mount } from "@/sdk/api";

export async function MangaList({
  currentPage = 1,
  renderData = (data = []) => data,
  title,
  get,
  mountList = (response) => ({ data: [], error: true }),
  href = "",
  paginate = false,
}) {
  const response = await get({ page: currentPage });
  const { data, error } = mountList(response);

  return (
    <List
      title={title}
      data={renderData(data)}
      error={error}
      seeMoreHref={href}
      paginate={paginate}
      {...(paginate && mount.pagination(response))}
    />
  );
}

MangaList.displayName = "MangaList";
