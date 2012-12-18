    file_list = dir(fullfile('./','*chosed*.csv'));
    targetfile = dir(fullfile('./','target.csv'));
    target = load(targetfile(1).name);
    
    data = zeros(length(file_list), 40);
    
    for m = 1:length(file_list)
        tempdata =  load(file_list(m).name);
        data(m,:) = tempdata(1:40);
    end
    MaxIter = 10;
    [m,n] = size(data);%���ݼ�Ϊһ��M*N�ľ�������ÿһ�д���һ������
    indices=crossvalind('Kfold',data(1:m,n),5);%��������ְ�
    for k=1:5
        test = (indices == k); %���test��Ԫ�������ݼ��ж�Ӧ�ĵ�Ԫ���
        train = ~test;%train��Ԫ�صı��Ϊ��testԪ�صı��
        TrainData=data(train,:);%�����ݼ��л��ֳ�train����������
        TrainData =TrainData';
        TrainLabels=target(:,train);%����������Ĳ���Ŀ�꣬�ڱ�������ʵ�ʷ������
        ControlData=data(test,:);%test������
        ControlData = ControlData';
        ControlLabels=target(:,test);
       
        % Step3: constructing weak learner
        weak_learner = tree_node_w(3); % pass the number of tree splits to the constructor 
        [RLearners RWeights] = RealAdaBoost(weak_learner, TrainData, TrainLabels, MaxIter);
        [MLearners MWeights] = ModestAdaBoost(weak_learner, TrainData, TrainLabels, MaxIter);
    end
