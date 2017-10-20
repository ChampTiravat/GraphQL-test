export default {
  Query: {
    getPost: (parent, args, context) => ({
      id: "1c1d12",
      title: "best article ever!",
      content: "some best content identical to the title",
      creator: {
        name: "tiravat",
        email: "tiravat2016@gmail.com",
        password: "123456"
      }
    })
  }
};
