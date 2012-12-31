file_list = dir(fullfile('./','*.csv'));
data = zeros(length(file_list),45);
%delete ('*chosed*');
for m = 1:length(file_list)
    tempdata =  csvread(file_list(m).name);
    data(m,:) = tempdata(1:45);
end
%[Idx,C]=kmeans(data,10);
[Idx,C]=kmeans(data,10,'emptyaction','singleton');


% nsamp=64;
% 
% max(1) = mode(Idx);
% Idx2 = Idx;
% Idx2(Idx2==max)=nan;
% max(2) = mode(Idx2);
% 
% for m1 = 1:2
% 	current_file_lsit = file_list(Idx == max(m1),:);
%     distance_matrix = zeros(size(current_file_lsit,1), size(current_file_lsit,1));
% 	for n = 1:size(current_file_lsit,1)
%         image=imread(current_file_lsit(n).name(length('feature_')+1:end-4));
%         image = im2bw(image);
%         %应该先判断边缘颜色
%         image = ~image;    
%         image=im2double(image);
%         [x1,y1,t1]=bdry_extract_3(image);
%         nsamp1=length(x1);
%         if nsamp1>=nsamp
%            [x1,y1,t1]=get_samples_1(x1,y1,t1,nsamp);
%         else
%            error('shape #1 doesn''t have enough samples')
%         end
%         X{n}=[x1 y1];
% 	end
%     for m = 1:length(current_file_lsit)
%         for n = m+1:length(current_file_lsit)   
%             [K, S, best_cost, D1, D2] = shape_matching(X{m}, X{n},'bipartite','shape_context','','euclidean');
%             distance_matrix(m,n) = best_cost;
%             distance_matrix(n,m) = best_cost;
%         end
%         %X{m} = {};
%     end
%      [label, energy, index] = kmedoids(distance_matrix,2);
%      for m = 1:10
%         result = current_file_lsit(label == m,:);
%         figure;
%         for n = 1:length(result)
%             subplot(length(result),1,n);
%             I=imread(result(n).name(length('feature_')+1:end-4));
%             imshow(I);
%         end
%     end
% end








% for m = 1:10
%     result = file_list(Idx == m,:);
%     figure;
%     for n = 1:size(result,1)
%         subplot(size(result,1),1,n);
%         I=imread(result(n).name(length('feature_')+1:end-4));
%         imshow(I);
%     end
% %     for n = 1:size(result,1)
% %         subplot(size(result,1),2,size(result,1)+n);
% %         I=imread(['ifrdescp_',result(n).name(length('feature_fourier_descriptor_')+1:end-4)]);
% %         imshow(I);
% %     end
%     
% end





%# loop through all clusters
for iCluster = 1:max(Idx)
    %# find the points that are part of the current cluster
    currentPointIdx = find(Idx==iCluster);
    %# find the index (among points in the cluster)
    %# of the point that has the smallest Euclidean distance from the centroid
    %# bsxfun subtracts coordinates, then you sum the squares of
    %# the distance vectors, then you take the minimum
    [~,minIdx] = min(sum(bsxfun(@minus,data(currentPointIdx,:),C(iCluster,:)).^2,2));
    %# store the index into X (among all the points)
    closestIdx(iCluster) = currentPointIdx(minIdx);
end

for iCluster = 1:max(Idx)
    copyfile(file_list(closestIdx(iCluster)).name(length('feature_fourier_descriptor_') + 1:end-4),[num2str(iCluster),'chosed',file_list(closestIdx(iCluster)).name(1:end-4)]);
    copyfile(file_list(closestIdx(iCluster)).name,[num2str(iCluster),'chosed',file_list(closestIdx(iCluster)).name]);
end



