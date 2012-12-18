function getfeature(filename, featuretype)
image = imread(filename);
BW = edge(image);
z = frdescp(BW);
csvwrite([filename,'.txt'],a)