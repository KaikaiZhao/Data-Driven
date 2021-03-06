model_class = read_PSBCla('coarse1Train.cla');
class_number = length(model_class);

candiate_class_number = 10;
model_image_number = 42;
feature_number = 70;
iteration_number = 2;
for m = 1:class_number
    
    model_number = length(model_class(m).model_index);
    if(model_number == 0)
        continue;
    end
    
    choosed_other_class_index = randperm(class_number);
    choosed_other_class_index(find...
    (choosed_other_class_index == m)) = [];
    temp_length = length(choosed_other_class_index);
    for n = temp_length + 1:model_number
        temp = randi([1,length(choosed_other_class_index)]);
        choosed_other_class_index(n) = choosed_other_class_index(temp);
    end
    for n = 1:class_number
        if length(model_class(n).model_index) == 0
            choosed_other_class_index(find...
                (choosed_other_class_index == n)) = [];
        end
    end
    for n = 1:length(choosed_other_class_index)
            other_class_index = choosed_other_class_index(n);
            choosed_other_class_model_index(n) = randi([1,length(model_class(other_class_index).model_index)]);
    end
    
    
    for n = 1:model_number
        cd(['m',num2str(model_class(m).model_index(n))]);
        feature_file = dir(fullfile('./','*chosed*.csv'));
        if(length(feature_file) < candiate_class_number)
            delete('*chosed*.csv');
            image_file = dir(fullfile('./','sample_*.bmp'));
            if(length(image_file) < model_image_number)
                filelist = dir(fullfile('./','*.off'));
                mkdir(num2str(iteration_number));
                sample(filelist(1).name, 'off', iteration_number);
               
                close;
            end
            file_list = dir(fullfile('./','sample_*.bmp'));
            for l = 1:length(file_list)
                getfeature(file_list(l).name);
            end
            
            file_list = dir(fullfile('./','*.csv'));
            data = zeros(length(file_list), feature_number);
            for k = 1:length(file_list)
                tempdata =  csvread(file_list(k).name);
                data(k,:) = tempdata;
            end
            [Idx,C]=kmeans(data,10,'emptyaction','singleton');

            for k = 1:10
                result = file_list(Idx == k,:);
                figure;
                for l = 1:size(result,1)
                    subplot(size(result,1),1,l);
                    I=imread(result(l).name(9:end-4));
                    %imshow(I);
                end
            end

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
        end
        file_list = dir(fullfile('./','*chosed*.csv'));
        current_model_feature = zeros(length(file_list),feature_number);
        for k = 1:length(file_list)
            current_model_feature(k,:) = csvread(file_list(k).name);
        end
        sample_same_class = model_number - 1;
        %sample_same_class = 1;
        sample_other_class = sample_same_class;
        choosed_same_class_model_index = randperm(model_number);
        choosed_same_class_model_index(find...
            (choosed_same_class_model_index == n)) = [];
        cd('..');
        
        for k = 1:candiate_class_number
            all_feature{k} = zeros(sample_same_class + sample_other_class,feature_number);
        end
        for k = 1:sample_same_class
            
            cd(['m',num2str(model_class(m).model_index(choosed_same_class_model_index(k)))]);
            feature_file = dir(fullfile('./','*chosed*.csv'));
            if(length(feature_file) < candiate_class_number)
                preprocess;
            end
            file_list = dir(fullfile('./','*chosed*.csv'));
            compare_model_feature = zeros(length(file_list),feature_number);
            for l = 1:length(file_list)
                compare_model_feature(l,:) = csvread(file_list(l).name);
            end
            for l = 1:candiate_class_number
                temp_distance = zeros(candiate_class_number,1);
                for p = 1:candiate_class_number
                    temp_distance(p) =  sum(current_model_feature(l,:) .* compare_model_feature(p,:));
                end
                temp_index = find(temp_distance==min(temp_distance));
                all_feature{l}(k,:) = compare_model_feature(temp_index,:);
            end
            cd('..');
        end
        
        
%         choosed_other_class_index = randperm(class_number);
%         choosed_other_class_index(find...
%             (choosed_other_class_index == m)) = [];
%         for k = 1:class_number
%             if length(model_class(k).model_index) == 0
%                 choosed_other_class_index(find...
%                     (choosed_other_class_index == k)) = [];
%             end
%         end
        
        for k = 1:sample_other_class
%             other_class_index = choosed_other_class_index(k);
%             choosed_other_class_model_index = randi(length(model_class(other_class_index).model_index));
%             cd(['m',num2str(model_class(other_class_index).model_index(choosed_other_class_model_index))]);
            other_class_index = choosed_other_class_index(k);
            cd(['m',num2str(model_class(other_class_index).model_index(choosed_other_class_model_index(k)))]);
            feature_file = dir(fullfile('./','*chosed*.csv'));
            if(length(feature_file) < candiate_class_number)
                preprocess;
            end
            file_list = dir(fullfile('./','*chosed*.csv'));
            compare_model_feature = zeros(length(file_list),feature_number);
            for l = 1:length(file_list)
                compare_model_feature(l,:) = csvread(file_list(l).name);
            end
            for l = 1:candiate_class_number
                temp_distance = zeros(candiate_class_number,1);
                for p = 1:candiate_class_number
                    temp_distance(p) =  sum(current_model_feature(l,:) .* compare_model_feature(p,:));
                end
                temp_index = find(temp_distance==min(temp_distance));
                all_feature{l}(k+sample_same_class,:) = compare_model_feature(temp_index(1),:);

            end
            cd('..');
        end        
        labels = zeros(1,sample_same_class + sample_other_class +1);
        labels(1:sample_same_class+1) = 1;
        labels(sample_same_class+1:end) = -1;
        trainfeature = zeros(sample_same_class + sample_other_class+1, feature_number);
        
        for k = 1:candiate_class_number
            trainfeature(1,:) = current_model_feature(k,:);
            trainfeature(2:end,:) = all_feature{k};
            MaxIter = 10;
            temp_matrix = zeros(sample_same_class + sample_other_class+1, feature_number);
            [size_m,size_n] = size(trainfeature);%数据集为一个M*N的矩阵，其中每一行代表一个样本
            indices=crossvalind('Kfold',temp_matrix(1:size_m,size_n),5);%进行随机分包
            ErrorR(k) = 0;
            for l=1:5
                test = (indices == l); %获得test集元素在数据集中对应的单元编号
                train = ~test;%train集元素的编号为非test元素的编号
                TrainData=trainfeature(train,:);%从数据集中划分出train样本的数据
                TrainData =TrainData';
                TrainLabels=labels(:,train);%获得样本集的测试目标，在本例中是实际分类情况
                ControlData=trainfeature(test,:);%test样本集
                ControlData = ControlData';
                ControlLabels=labels(:,test);
                
                
                
                % Step3: constructing weak learner
                weak_learner = tree_node_w(3); % pass the number of tree splits to the constructor 
                [RLearners RWeights] = RealAdaBoost(weak_learner, TrainData, TrainLabels, MaxIter);
                ResultR = sign(Classify(RLearners, RWeights, ControlData));
                ErrorR(k)  = ErrorR(k) + sum(ControlLabels ~= ResultR) / length(ControlLabels);
            end           
        end
        [c,pos]=sort(ErrorR);
        cd(['m',num2str(model_class(m).model_index(n))]);

        csvwrite('result.csv',pos);
        cd('..');
    end
end

% 
% 
% 
% image_size = 10
% feature_size = 45;
% currentdir = 'm504';
% feature_file = dir(fullfile('./','*chosed*.csv'));
% current_model_data = zeros(length(feature_file), feature_size);
% for m = 1:length(feature_file)
%         tempdata =  csvread(feature_file(m).name);
%         current_model_data(m,:) = tempdata;
% end
% 
% trainfeature = zeros(model_number, feature_size);
% labels = zeros(1,model_number);
% labels(1:same_model_number) = 1;
% labels(same_model_number:end) = -1;
% 
% cd('..');
% list = dir();
% 
% 
% 
% for n = 1:length(list)-2
%     min = 99999999;
%     if(strcmp(list(n+2).name, currentdir) == 1)
%         continue;
%     end
%     cd(list(dirindex).name);
%     feature_file = dir(fullfile('./','*chosed*.csv'));
%     test_model_data = zeros(length(feature_file), feature_size);
%     for m = 1:length(feature_file)
%         tempdata =  csvread(feature_file(m).name);
%         test_model_data(m,:) = tempdata;
%     end
%     tempindex = 0;
%     for j = 1:image_size
%         if(sqrt(sum(current_model_data(n,:) .* test_model_data(j,:))) < min)
%             trainfeature(n,:) = test_model_data(j,:);
%             tempindex = j;
%         end
%     end
% end 
% 
% for n = 1:other_model_number
%     min = 99999999;
%     feature_file = dir(fullfile('./','*chosed*.csv'));
% 
%     test_model_data = zeros(length(file_list), feature_size);
%     for m = 1:length(file_list)
%         tempdata =  csvread(file_for(m).name);
%         test_model_data(m,:) = tempdata;
%     end
%     for j = 1:image_size
%         if(sqrt(sum(current_model_data(n,:) .* test_model_data(j,:))) < min)
%             trainfeature(n,:) = test_model_data(j,:);
%         end
%     end
% end 
