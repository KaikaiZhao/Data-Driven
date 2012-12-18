function getfeature(filename, featuretype)
    image = imread(filename);
    bwimage = im2bw(image);
    %Ӧ�����жϱ�Ե��ɫ
    bwimage = ~bwimage;
    boundry = bwboundaries(bwimage, 'noholes');
    fourier_descriptor = frdescp(boundry{1});
    csvwrite([filename, '.csv'],fourier_descriptor');
    
    
