const GetTask = async (search: string) => {
  try {
    const res = await fetch(`/api/todos${search}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default GetTask;
