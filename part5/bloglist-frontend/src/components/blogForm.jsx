const BlogForm = ({
  onSubmit,
  newTitle,
  handleChangeTitle,
  newAuthor,
  handleChangeAuthor,
  newUrl,
  handleChangeUrl,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      title:
      <input value={newTitle} onChange={handleChangeTitle} />
    </div>
    <div>
      author:
      <input value={newAuthor} onChange={handleChangeAuthor} />
    </div>
    <div>
      url:
      <input value={newUrl} onChange={handleChangeUrl} />
    </div>
    <button type="submit">save</button>
  </form>
);

export default BlogForm;
