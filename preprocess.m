            delete('*chosed*.csv');
            image_file = dir(fullfile('./','sample_*.bmp'));
            if(length(image_file) < model_image_number)
                filelist = dir(fullfile('./','*.off'));
                sample(filelist(1).name, 'off');
                close;
            end
            file_list = dir(fullfile('./','sample_*.bmp'));
            for l = 1:length(file_list)
                getfeature(file_list(l).name);
            end
            
            file_list = dir(fullfile('./','*.csv'));
            data = zeros(length(file_list), feature_number);
            for p = 1:length(file_list)
                tempdata =  csvread(file_list(p).name);
                data(p,:) = tempdata;
            end

            [Idx,C]=kmeans(data,10,'emptyaction','singleton');

%             for k = 1:10
%                 result = file_list(Idx == k,:);
%                 figure;
%                 for l = 1:size(result,1)
%                     subplot(size(result,1),1,l);
%                     I=imread(result(l).name(9:end-4));
%                     %imshow(I);
%                 end
%             end

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
                copyfile(file_list(closestIdx(iCluster)).name(9:end-4),[num2str(iCluster),'chosed',file_list(closestIdx(iCluster)).name(1:end-4)]);
                copyfile(file_list(closestIdx(iCluster)).name,[num2str(iCluster),'chosed',file_list(closestIdx(iCluster)).name]);
            end 