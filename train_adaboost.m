    file_list = dir(fullfile('./','*chosed*.csv'));
    targetfile = dir(fullfile('./','target.csv'));
    target = load(targetfile(1).name);
    
    data = zeros(length(file_list), 40);
    
    for m = 1:length(file_list)
        tempdata =  load(file_list(m).name);
        data(m,:) = tempdata(1:40);
    end
    MaxIter = 10;
    [m,n] = size(data);%数据集为一个M*N的矩阵，其中每一行代表一个样本
    indices=crossvalind('Kfold',data(1:m,n),5);%进行随机分包
    for k=1:5
        test = (indices == k); %获得test集元素在数据集中对应的单元编号
        train = ~test;%train集元素的编号为非test元素的编号
        TrainData=data(train,:);%从数据集中划分出train样本的数据
        TrainData =TrainData';
        TrainLabels=target(:,train);%获得样本集的测试目标，在本例中是实际分类情况
        ControlData=data(test,:);%test样本集
        ControlData = ControlData';
        ControlLabels=target(:,test);
       
        % Step3: constructing weak learner
        weak_learner = tree_node_w(3); % pass the number of tree splits to the constructor 
        [RLearners RWeights] = RealAdaBoost(weak_learner, TrainData, TrainLabels, MaxIter);
        [MLearners MWeights] = ModestAdaBoost(weak_learner, TrainData, TrainLabels, MaxIter);
    end
