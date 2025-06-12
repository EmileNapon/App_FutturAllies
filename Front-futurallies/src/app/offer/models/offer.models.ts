// offer.model.ts

export class Offer {
    _id: string;
    profil: string;
    topic: string;
    company: string;
    companyLocation: string;
    companyWebsite?: string;
    description: string;
    domain: string;
    location: string;
    salary?: number;
    duration?: number;
    type: 'Job' | 'Internship' | 'Other';
    requirements?: string;
    responsibilities?: string;
    educationLevel?: string;
    experienceLevel?: string;
    contractType: 'CDI' | 'CDD';
    benefits?: string;
    contactEmail: string;
    status: 'Open' | 'Closed' | 'Pending';
    isRemoteWorking: boolean;
    applicationMode: 'Online' | 'Physical' | 'Both';
    isCvDocRequired: boolean;
    isMlDocRequired: boolean;
    canAddAdditionalDocs: boolean;
    applicationLink?: string;
    additionalInfo?: string;
    createdBy: string;
    postedDate: Date;
    updatedDate?: Date;
    expirationDate?: Date;
    hasPreselection?: boolean;
    preselectionType?: 'OnApplicationFile' | 'OnQuiz';
    preselectionQuizMode?: 'Online' | 'Physical';
    hasEvaluation?: boolean;
    evaluationMode?: 'Online' | 'Physical';
    hasInterview?: boolean;
    interviewMode?: 'ByPhone' | 'InVisio' | 'Physical';

    constructor(
        _id: string,
        profil: string,
        topic: string,
        company: string,
        companyLocation: string,
        description: string,
        domain: string,
        location: string,
        type: 'Job' | 'Internship' | 'Other',
        contractType: 'CDI' | 'CDD',
        contactEmail: string,
        postedDate: Date,
        status: 'Open' | 'Closed' | 'Pending',
        isRemoteWorking: boolean,
        applicationMode: 'Online' | 'Physical' | 'Both',
        isCvDocRequired: boolean,
        isMlDocRequired: boolean,
        canAddAdditionalDocs: boolean,
        createdBy: string,
        salary?: number,
        duration?: number,
        companyWebsite?: string,
        requirements?: string,
        responsibilities?: string,
        educationLevel?: string,
        experienceLevel?: string,
        benefits?: string,
        expirationDate?: Date,
        applicationLink?: string,
        additionalInfo?: string,
        updatedDate?: Date,
        hasPreselection?: boolean,
        preselectionType?: 'OnApplicationFile' | 'OnQuiz',
        preselectionQuizMode?: 'Online' | 'Physical',
        hasEvaluation?: boolean,
        evaluationMode?: 'Online' | 'Physical',
        hasInterview?: boolean,
        interviewMode?: 'ByPhone' | 'InVisio' | 'Physical',
    ) {
        this._id = _id;
        this.profil = profil;
        this.topic = topic;
        this.company = company;
        this.companyLocation = companyLocation;
        this.description = description;
        this.domain = domain;
        this.location = location;
        this.type = type;
        this.contractType = contractType;
        this.contactEmail = contactEmail;
        this.postedDate = postedDate;
        this.status = status;
        this.isRemoteWorking = isRemoteWorking;
        this.applicationMode = applicationMode;
        this.isCvDocRequired = isCvDocRequired;
        this.isMlDocRequired = isMlDocRequired;
        this.canAddAdditionalDocs = canAddAdditionalDocs;
        this.salary = salary;
        this.duration = duration;
        this.companyWebsite = companyWebsite;
        this.requirements = requirements;
        this.responsibilities = responsibilities;
        this.educationLevel = educationLevel;
        this.experienceLevel = experienceLevel;
        this.benefits = benefits;
        this.expirationDate = expirationDate;
        this.applicationLink = applicationLink;
        this.additionalInfo = additionalInfo;
        this.updatedDate = updatedDate;
        this.createdBy = createdBy;
        this.hasPreselection = hasPreselection;
        this.preselectionType = preselectionType;
        this.preselectionQuizMode = preselectionQuizMode;
        this.hasEvaluation = hasEvaluation;
        this.evaluationMode = evaluationMode;
        this.hasInterview = hasInterview;
        this.interviewMode = interviewMode;
    }
}

// offer-application.model.ts

export class OfferApplication {
    _id: string;
    offerId: string;
    candidatId: string;
    status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review';
    message: string;
    submittedDocumentsIds: string[];
    applicationDate: Date;
    lastUpdated: Date;

    constructor(
        _id: string,
        offerId: string,
        candidatId: string,
        status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review',
        message: string,
        submittedDocumentsIds: string[],
        applicationDate: Date,
        lastUpdated: Date
    ) {
        this._id = _id;
        this.offerId = offerId;
        this.candidatId = candidatId;
        this.status = status;
        this.message = message;
        this.submittedDocumentsIds = submittedDocumentsIds;
        this.applicationDate = applicationDate;
        this.lastUpdated = lastUpdated;
    }
}

// offer-stats.model.ts

export class OfferStats {
    _id: string;
    name: string;
    stat: number;

    constructor(_id: string, name: string, stat: number) {
        this._id = _id;
        this.name = name;
        this.stat = stat;
    }
}