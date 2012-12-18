originalView = imread('1.bmp');
%processedView = rgb2gray(originalView);
processedView = im2double(originalView);
[x,y,t] = bdry_extract_3(processedView);
X = [x y];
[BH, meanDist] = sc_compute(X',zeros(1,size(x,1)),[],12,5,1/8,2,zeros(1,size(x,1)));
