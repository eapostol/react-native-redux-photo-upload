Formdata
Sending the full sized image and a smaller sized thumbnail
Fetch thumbs instead of fullsized images on app startup for speed
Redux with re-ducks pattern and redux-axios-middleware for handling payload and errors

git clone
npm install
Link x 3
"Privacy - Camera Usage Description" in your Info.plist 

npm install -g upload-server
mkdir http
http-server start -f http
cd http 
mkdir images thumbs


TODO:
- Loading animation using fetch
- Open original image in fullscreen
- Delete images
- Better error handling (alerting users what actually happens)
- Store images on local for faster app startup