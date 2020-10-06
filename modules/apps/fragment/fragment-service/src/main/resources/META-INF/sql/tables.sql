create table FragmentCollection (
	mvccVersion LONG default 0 not null,
	ctCollectionId LONG default 0 not null,
	uuid_ VARCHAR(75) null,
	fragmentCollectionId LONG not null,
	groupId LONG,
	companyId LONG,
	userId LONG,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	fragmentCollectionKey VARCHAR(75) null,
	name VARCHAR(75) null,
	description STRING null,
	lastPublishDate DATE null,
	primary key (fragmentCollectionId, ctCollectionId)
);

create table FragmentComposition (
	mvccVersion LONG default 0 not null,
	ctCollectionId LONG default 0 not null,
	uuid_ VARCHAR(75) null,
	fragmentCompositionId LONG not null,
	groupId LONG,
	companyId LONG,
	userId LONG,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	fragmentCollectionId LONG,
	fragmentCompositionKey VARCHAR(75) null,
	name VARCHAR(75) null,
	description VARCHAR(75) null,
	data_ TEXT null,
	previewFileEntryId LONG,
	lastPublishDate DATE null,
	status INTEGER,
	statusByUserId LONG,
	statusByUserName VARCHAR(75) null,
	statusDate DATE null,
	primary key (fragmentCompositionId, ctCollectionId)
);

create table FragmentEntry (
	mvccVersion LONG default 0 not null,
	ctCollectionId LONG default 0 not null,
	uuid_ VARCHAR(75) null,
	headId LONG,
	head BOOLEAN,
	fragmentEntryId LONG not null,
	groupId LONG,
	companyId LONG,
	userId LONG,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	fragmentCollectionId LONG,
	fragmentEntryKey VARCHAR(75) null,
	name VARCHAR(75) null,
	css TEXT null,
	html TEXT null,
	js TEXT null,
	cacheable BOOLEAN,
	configuration TEXT null,
	previewFileEntryId LONG,
	readOnly BOOLEAN,
	type_ INTEGER,
	lastPublishDate DATE null,
	status INTEGER,
	statusByUserId LONG,
	statusByUserName VARCHAR(75) null,
	statusDate DATE null,
	primary key (fragmentEntryId, ctCollectionId)
);

create table FragmentEntryLink (
	mvccVersion LONG default 0 not null,
	ctCollectionId LONG default 0 not null,
	uuid_ VARCHAR(75) null,
	fragmentEntryLinkId LONG not null,
	groupId LONG,
	companyId LONG,
	userId LONG,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	originalFragmentEntryLinkId LONG,
	fragmentEntryId LONG,
	segmentsExperienceId LONG,
	classNameId LONG,
	classPK LONG,
	plid LONG,
	css TEXT null,
	html TEXT null,
	js TEXT null,
	configuration TEXT null,
	editableValues TEXT null,
	namespace VARCHAR(75) null,
	position INTEGER,
	rendererKey VARCHAR(200) null,
	lastPropagationDate DATE null,
	lastPublishDate DATE null,
	primary key (fragmentEntryLinkId, ctCollectionId)
);

create table FragmentEntryVersion (
	mvccVersion LONG default 0 not null,
	ctCollectionId LONG default 0 not null,
	fragmentEntryVersionId LONG not null,
	version INTEGER,
	uuid_ VARCHAR(75) null,
	fragmentEntryId LONG,
	groupId LONG,
	companyId LONG,
	userId LONG,
	userName VARCHAR(75) null,
	createDate DATE null,
	modifiedDate DATE null,
	fragmentCollectionId LONG,
	fragmentEntryKey VARCHAR(75) null,
	name VARCHAR(75) null,
	css TEXT null,
	html TEXT null,
	js TEXT null,
	cacheable BOOLEAN,
	configuration TEXT null,
	previewFileEntryId LONG,
	readOnly BOOLEAN,
	type_ INTEGER,
	lastPublishDate DATE null,
	status INTEGER,
	statusByUserId LONG,
	statusByUserName VARCHAR(75) null,
	statusDate DATE null,
	primary key (fragmentEntryVersionId, ctCollectionId)
);