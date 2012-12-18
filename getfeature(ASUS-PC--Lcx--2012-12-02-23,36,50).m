function getfeature(filename, featuretype)
    image = imread(filename);
    bwimage = im2bw(image);
    %应该先判断边缘颜色
    bwimage = ~bwimage;
    boundry = bwboundaries(bwimage, 'noholes');
    fourier_descriptor = frdescp(boundry{1});
    csvwrite([filename, '.csv'],fourier_descriptor');
    
    
