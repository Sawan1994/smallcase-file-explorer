export const initial_data = {
  "root": {
    name: "Root",
    path: "root",
    type: "folder",
    isRoot: true,
    isOpen: true,
    size: "",
    creator_name: "",
    created_date: "",
    children: ["root/davids", "root/jslancer"]
  },
  "root/davids": {
    name: "david",
    path: "root/davids",
    type: "folder",
    size: "",
    creator_name: "",
    created_date: "",
    children: ["root/davids/readme.md"]
  },
  "root/davids/readme.md": {
    name: "readme.md",
    path: "root/davids/readme.md",
    type: "file",
    size: "",
    creator_name: "",
    created_date: "",
    content: "Thanks for reading me me. But there is nothing here."
  },
  "root/jslancer": {
    name: "jslancer",
    path: "root/jslancer",
    type: "folder",
    size: "",
    creator_name: "",
    created_date: "",
    children: ["root/jslancer/projects", "root/jslancer/vblogs"]
  },
  "root/jslancer/projects": {
    name: "projects",
    path: "root/jslancer/projects",
    type: "folder",
    size: "",
    creator_name: "",
    created_date: "",
    children: ["root/jslancer/projects/treeview"]
  },
  "root/jslancer/projects/treeview": {
    name: "treeview",
    path: "root/jslancer/projects/treeview",
    type: "folder",
    size: "",
    creator_name: "",
    created_date: "",
    children: []
  },
  "root/jslancer/vblogs": {
    name: "vblogs",
    path: "root/jslancer/vblogs",
    type: "folder",
    size: "",
    creator_name: "",
    created_date: "",
    children: []
  }
};

export const initialData = {
  name: "Root",
  toggled: false,
  size: "",
  creator_name: "",
  created_date: "",
  path: "",
  fileType: "folder",
  children: [
    {
      name: "Apps",
      size: "",
      creator_name: "",
      created_date: "",
      path: "Root",
      fileType: "folder",
      children: []
    },
    {
      name: "Pictures",
      size: "",
      creator_name: "",
      created_date: "",
      path: "Root",
      fileType: "folder"
    },
    {
      name: "Videos",
      size: "",
      creator_name: "",
      created_date: "",
      path: "Root",
      fileType: "folder"
    },
    {
      name: "Docs",
      size: "",
      creator_name: "",
      created_date: "",
      path: "Root",
      fileType: "folder",
      children: [
        {
          name: "Work",
          size: "",
          creator_name: "",
          created_date: "",
          path: "Root/Docs",
          fileType: "folder",
          children: [
            {
              name: "e.pdf",
              size: "",
              creator_name: "",
              created_date: "",
              path: "Root/Docs/Work",
              fileType: "file"
              // children: []
            },
            {
              name: "f.ts",
              size: "",
              creator_name: "",
              created_date: "",
              path: "Root/Docs/Work",
              fileType: "file"
              // children: []
            }
          ]
        },
        {
          name: "c.pdf",
          size: "",
          creator_name: "",
          created_date: "",
          path: "Root/Docs",
          fileType: "file"
          // children: [""]
        },
        {
          name: "d.docx",
          size: "",
          creator_name: "",
          created_date: "",
          path: "Root/Docs",
          fileType: "file"
          // children: [""]
        }
      ]
    },
    {
      name: "a.pdf",
      size: "",
      creator_name: "",
      created_date: "",
      path: "Root",
      fileType: "file"
      // children: []
    },
    {
      name: "b.jpg",
      size: "",
      creator_name: "",
      created_date: "",
      path: "Root",
      fileType: "file"
      // children: []
    }
  ]
};
