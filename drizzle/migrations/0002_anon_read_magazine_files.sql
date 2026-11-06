create policy "Anyone can read magazine files"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'magazines');