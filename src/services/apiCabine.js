import supabase, { supabaseUrl } from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getAllCabins() {
  let { data, error } = await supabase
    .from('cabins')
    .select('*');
  return { data, error };
}

export async function getCabins({ filter, sortBy, page }) {
  let query = supabase
    .from('cabins')
    .select('*, bookings(status)', { count: 'exact' });

  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value);
  }

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return { data, count };
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //  Create cabin
  let query = supabase.from('cabins');
  //  Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }
  //  upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // delete the cabin if thre was an error on uploading image
  if (storageError) {
    const { data, error } = await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabins image could not be uploaded and the cabin was not created'
    );
  }
  return data;
}
export async function deleteCabin(cabin) {
  const id = cabin.id;
  const imageName = cabin.image.split('/').slice(-1);
  const { error: deleteImageError } = await supabase.storage
    .from('cabin-images')
    .remove(imageName);

  const { data, error: deleteEntryError } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (deleteEntryError) {
    console.error(deleteEntryError);
    throw new Error('Cabins could not be deleted');
  }
  if (deleteImageError) {
    console.error(deleteImageError);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
