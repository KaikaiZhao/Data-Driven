function getfeature(filename)
    image = imread(filename);
     image = im2bw(image);
%     %应该先判断边缘颜色
%     image = ~image;
%     boundry = bwboundaries(image, 'noholes');
%     result_index = 1;
%     for index = 1:length(boundry)
%         if length(boundry{index}) >= boundry{result_index}
%             result_index = index;
%             max_size = length(boundry{index});
%         end
%     end


    sizeofFD = 64;
    lineimg=edge(image, 'canny');
    %Mark the edges of the shapes from the gray in different number
    labelimg = bwlabel(lineimg);
    ii = sqrt(-1);
    fy = [];
    fx = [];
    for m=1:max(max(labelimg))
        [temp_fy, temp_fx] = find(labelimg == m);
        if(length(temp_fy) > length(fy))
            fy = temp_fy;
            fx = temp_fx;
        end
    end
    U = fx + fy*ii;
    %Extracts the Fourier Descriptor of a contour
    [F1]=extractFD(U);
    %Normalize the Fourier Descriptor, which is invariant to translation,
    %rotation and scaling of the original contour
    [F2]=normaliseFD(F1);
    %Resize the Fourier Descriptor into assigned length
    F=resizeFD(F2, sizeofFD); 
    
%     zernik = zeros(1,35);
%     imagesize = size(image, 1);
%     if size(image, 1) >= size(image,2);
%         imagesize = size(image, 2);
%     end
%     image = imresize(image,[imagesize imagesize]);
%     order = [1,1;2,0;2,2;3,1;3,3;4,0;4,2;4,4;5,1;5,3;5,5;6,0;6,2;6,4;6,6;7,1;7,3;7,5;7,7;8,0;8,2;8,4;8,6;8,8;9,1;9,3;9,5;9,7;9,9;10,0;10,2;10,4;10,6;10,8;10,10;];
%     for index=1:size(order,1)
%         [Z A Phi] = Zernikmoment(image, order(index,1) ,order(index,2));
%         zernik(index) = Z;
%     end
% %    csvwrite(['feature_zernik_',filename, '.csv'],zernik);
% 
% %    fourier_descriptor = fourier_descriptor';
%     data = [zernik, F(1:32)];
%         
%    csvwrite(['feature_',filename, '.csv'],data);

%     featre_image = ifrdescp(fourier_descriptor,200);
%     featre_image=bound2im(featre_image,420,560);
%     imwrite(featre_image,['ifrdescp_',filename],'bmp')
     csvwrite(['feature_fourier_descriptor_',filename, '.csv'], F);

