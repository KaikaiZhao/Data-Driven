function result = DistMatrix()%DISTMATRIX Summary of this function goes here
%   Detailed explanation goes here  
	file_list = dir(fullfile('./','*sample_*.bmp'));
    nsamp=100;
    result = zeros(length(file_list),length(file_list));
    for m = 1:length(file_list)
        image = imread(file_list(m).name);
        
        image = im2bw(image);
        %应该先判断边缘颜色
        image = ~image;    
        image=im2double(image);
        [x1,y1,t1]=bdry_extract_3(image);
        nsamp1=length(x1);
        if nsamp1>=nsamp
           [x1,y1,t1]=get_samples_1(x1,y1,t1,nsamp);
        else
           error('shape #1 doesn''t have enough samples')
        end
        X{m}=[x1 y1];
    end
	for m = 1:length(file_list)
        for n = m+1:length(file_list)   
            [K, S, best_cost, D1, D2] = shape_matching(X{m}, X{n},'bipartite','shape_context','','euclidean');
            result(m,n) = best_cost;
            result(n,m) = best_cost;
        end
        %X{m} = {};
    end
    
    
    
    for m = 1:10
        result = file_list(label == m,:);
        figure;
        for n = 1:length(result)
            subplot(length(result),1,n);
            I=imread(result(n).name(1:end));
            imshow(I);
        end
    end
    
    
    
    for m = 1:length(label)
        result = X(label == m);
        figure;
        for n = 1:length(result)
            subplot(length(result),1,n);
            imshow(result(n));
        end
    %     for n = 1:size(result,1)
    %         subplot(size(result,1),2,size(result,1)+n);
    %         I=imread(['ifrdescp_',result(n).name(length('feature_fourier_descriptor_')+1:end-4)]);
    %         imshow(I);
    %     end

    end
end

