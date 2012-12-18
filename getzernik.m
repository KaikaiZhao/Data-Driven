list = dir();
for m = 3:length(list)
    cd(list(m).name);
    file_list = dir(fullfile('./','*.bmp'));
    for n = 1:length(file_list)
        zernik = zeros(1,35);
        image = imread(file_list(n).name);
        image = im2bw(image);
        imagesize = size(image, 1);
        if size(image, 1) >= size(image,2);
            imagesize = size(image, 2);
        end
        image = imresize(image,[imagesize imagesize]);
        order = [1,1;2,0;2,2;3,1;3,3;4,0;4,2;4,4;5,1;5,3;5,5;6,0;6,2;6,4;6,6;7,1;7,3;7,5;7,7;8,0;8,2;8,4;8,6;8,8;9,1;9,3;9,5;9,7;9,9;10,0;10,2;10,4;10,6;10,8;10,10;];
        for index=1:size(order,1)
            [Z A Phi] = Zernikmoment(image, order(index,1) ,order(index,2));
            zernik(index) = Z;
        end
        csvwrite(['Zernik_',file_list(n).name, '.csv'],zernik');
        %zbf=zernike_bf(imagesize,0);
        %v=zernike_mom(image,zbf)
    end
    cd('..');
end
