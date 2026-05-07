import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", { id: "common" }, [
    index("routes/home/home.tsx"),
    route("search", "routes/search.tsx"),
    route("books/:bookId", "routes/book/book.tsx"),

    layout("routes/profile/profile.tsx", { id: "profile-layout" }, [
      route("profile", "routes/profile/tracking/to-read.tsx"),
      route("profile/completed", "routes/profile/tracking/completed.tsx"),
      route("profile/dropped", "routes/profile/tracking/dropped.tsx"),
      route("profile/on-hold", "routes/profile/tracking/on-hold.tsx"),
      route("profile/reading", "routes/profile/tracking/reading.tsx"),

      route("profile/cms/genres", "routes/profile/cms/genres/genres.tsx"),
      route("profile/cms/authors", "routes/profile/cms/authors/authors.tsx"),
      route("profile/cms/books", "routes/profile/cms/books/books.tsx"),
    ]),

    // API
    route("api/auth/sign-in", "routes/api/sign-in.ts"),
    route("api/auth/sign-up", "routes/api/sign-up.ts"),
    route("api/auth/logout", "routes/api/logout.ts"),
    route("api/send-feedback", "routes/api/send-feedback.ts"),

    route("api/cms/create-genre", "routes/api/cms/create-genre.ts"),
    route("api/cms/delete-genre", "routes/api/cms/delete-genre.ts"),
    route("api/cms/edit-genre", "routes/api/cms/edit-genre.ts"),

    route("api/cms/create-author", "routes/api/cms/create-author.ts"),
    route("api/cms/delete-author", "routes/api/cms/delete-author.ts"),
    route("api/cms/edit-author", "routes/api/cms/edit-author.ts"),

    route("api/cms/create-book", "routes/api/cms/create-book.ts"),
    route("api/cms/delete-book", "routes/api/cms/delete-book.ts"),
    route("api/cms/edit-book", "routes/api/cms/edit-book.ts"),
    route("api/cms/edit-book-genres", "routes/api/cms/edit-book-genres.ts"),
    route("api/cms/edit-book-authors", "routes/api/cms/edit-book-authors.ts"),

    route("api/set-book-status", "routes/api/set-book-status.ts"),
    route("api/unset-book-status", "routes/api/unset-book-status.ts"),
  ]),
] satisfies RouteConfig;
