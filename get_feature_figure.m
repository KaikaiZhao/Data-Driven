for m = 1:10
    result = file_list(Idx == m,:);
    figure;
    for n = 1:size(result,1)
        subplot(size(result,1),1,n);
        I=imread(result(n).name(length('feature_')+1:end-4));
        imshow(I);
    end
%     for n = 1:size(result,1)
%         subplot(size(result,1),2,size(result,1)+n);
%         I=imread(['ifrdescp_',result(n).name(length('feature_fourier_descriptor_')+1:end-4)]);
%         imshow(I);
%     end
    
end
