export const GetPostRequest = async ({
  route,
  body,
}: {
  route: string;
  body: object;
}) => {
  try {
    const response = await fetch(
      `${route}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.ok) {
      return { success: true, data: await response.json(), response };
    } else {
      const data = await response.json();
      throw new Error((await data?.msg) || " Lấy dữ liệu ko thành công");
    }
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, msg: e.message };
    } else return { success: false, msg: "Lỗi khi lấy dữ liệu" };
  }
};