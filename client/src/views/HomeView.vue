<script setup>
import { ref, reactive, onMounted } from "vue";
import api from "../api/api";
import { getCategories } from "../api/categoryApi";

const bookmarks = ref([]);
const categories = ref([]);
const editingId = ref(null);

const form = reactive({
  title: "",
  url: "",
  type: "article",
  description: "",
  thumbnail: "",
  favorite: 0,
  categoryId: null,
});

async function loadBookmarks() {
  try {
    const response = await api.get("/bookmarks");
    bookmarks.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

async function loadCategories() {
  try {
    categories.value = await getCategories();
  } catch (error) {
    console.error(error);
  }
}

function editBookmark(bookmark) {
  editingId.value = bookmark.id;

  Object.assign(form, {
    title: bookmark.title,
    url: bookmark.url,
    type: bookmark.type,
    description: bookmark.description || "",
    thumbnail: bookmark.thumbnail || "",
    favorite: bookmark.favorite || 0,
    categoryId: bookmark.categoryId,
  });
}

async function deleteBookmark(id) {
  if (!confirm("Delete this bookmark?")) return;

  try {
    await api.delete(`/bookmarks/${id}`);
    await loadBookmarks();
  } catch (error) {
    console.error(error);
  }
}

async function saveBookmark() {
  try {
    if (editingId.value) {
      await api.put(`/bookmarks/${editingId.value}`, form);
    } else {
      await api.post("/bookmarks", form);
    }

    editingId.value = null;

    Object.assign(form, {
      title: "",
      url: "",
      type: "article",
      description: "",
      thumbnail: "",
      favorite: 0,
      categoryId: null,
    });

    await loadBookmarks();
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  loadBookmarks();
  loadCategories();
});
</script>

<template>
  <div class="container">

    <h1>Media Library</h1>

    <div class="form">

      <input
        v-model="form.title"
        placeholder="Title"
      />

      <input
        v-model="form.url"
        placeholder="URL"
      />

      <label>Type</label>

      <select v-model="form.type">
        <option value="article">Article</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      <label>Category</label>

      <select v-model="form.categoryId">
        <option :value="null">
          No Category
        </option>

        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <button @click="saveBookmark">
        {{ editingId ? "Update Bookmark" : "Save Bookmark" }}
      </button>

    </div>

    <div
      class="card"
      v-for="bookmark in bookmarks"
      :key="bookmark.id"
    >

      <h2>{{ bookmark.title }}</h2>

      <a
        :href="bookmark.url"
        target="_blank"
      >
        {{ bookmark.url }}
      </a>

      <p>
        <strong>Type:</strong>
        {{ bookmark.type }}
      </p>

      <p>
        <strong>Category:</strong>
        {{
          categories.find(
            c => c.id === bookmark.categoryId
          )?.name || "None"
        }}
      </p>

      <div class="buttons">

        <button @click="editBookmark(bookmark)">
          Edit
        </button>

        <button @click="deleteBookmark(bookmark.id)">
          Delete
        </button>

      </div>

    </div>

  </div>
</template>

<style scoped>

.container{
    width:800px;
    margin:auto;
}

.form{
    display:flex;
    flex-direction:column;
    gap:10px;
    margin-bottom:30px;
}

input,
select{
    padding:10px;
    font-size:16px;
}

button{
    padding:10px;
    cursor:pointer;
}

.card{
    border:1px solid #ccc;
    border-radius:8px;
    padding:15px;
    margin-bottom:20px;
}

.buttons{
    margin-top:15px;
}

.buttons button{
    margin-right:10px;
}

</style>
