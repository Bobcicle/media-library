<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";

const bookmarks = ref([]);

const editingId = ref(null);

const form = ref({
  title: "",
  url: "",
  type: "article",
});

async function loadBookmarks() {
  try {
    const response = await api.get("/bookmarks");
    bookmarks.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

function editBookmark(bookmark) {

  editingId.value = bookmark.id;

  form.value = {
    title: bookmark.title,
    url: bookmark.url,
    type: bookmark.type
  };

}

async function deleteBookmark(id) {

  if (!confirm("Delete this bookmark?")) {
    return;
  }

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

      await api.put(
        `/bookmarks/${editingId.value}`,
        form.value
      );

    } else {

      await api.post(
        "/bookmarks",
        form.value
      );

    }

    editingId.value = null;

    form.value = {
      title: "",
      url: "",
      type: "article"
    };

    await loadBookmarks();

  } catch (error) {

    console.error(error);

  }

}


onMounted(loadBookmarks);
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

      <select v-model="form.type">
        <option value="article">Article</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
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

      <a :href="bookmark.url" target="_blank">
        {{ bookmark.url }}
      </a>

      <p>{{ bookmark.type }}</p>
     
 <div class="buttons">

  <button
    @click="editBookmark(bookmark)"
  >
    Edit
  </button>

  <button
    @click="deleteBookmark(bookmark.id)"
  >
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
