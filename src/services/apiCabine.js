import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let query = supabase.from('cabins').select('*');
  // if (name) query = query.eq('name', name).single();
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
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
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
  return data;
}
