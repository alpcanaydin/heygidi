const dataTransformer = (data) => {
  if (!data.length) {
    return [];
  }

  const counts = data.map(item => item.count);
  const max = Math.max(...counts);

  return data.map((item) => {
    const size = (item.count * 72) / max;

    return {
      text: item.word,
      size: size > 12 ? size : 12
    };
  });
};

export default dataTransformer;
