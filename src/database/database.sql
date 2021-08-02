-- drop database proyectofinal;
create database proyectofinal;
use proyectofinal;


CREATE VIEW vw_referencePoints AS SELECT  rfp_id, rfp_name, rfp_createdDate, rfp_description, rfp_location, rfp_summary, ctw_name as rfp_culturalWell FROM referencepoints JOIN  culturalwells ON referencepoints.rfp_culturalWell = culturalwells.ctw_id;
CREATE VIEW vw_referencePointSections AS SELECT  rps_id, rps_name, rps_image, rps_description, rfp_name as rps_referencePoint FROM referencepointsections JOIN referencepoints ON referencepointsections.rps_referencePoint = referencepoints.rfp_id;
CREATE VIEW vw_qrs AS SELECT qr_id, qr_image, ctw_name as qr_culturalWell FROM qrs JOIN culturalwells ON qrs.qr_culturalWell = culturalwells.ctw_id;
CREATE VIEW vw_authors AS SELECT aut_id, aut_name, aut_lastname, rfp_name as aut_referencePoint FROM authors JOIN referencepoints ON authors.aut_referencePoint = referencepoints.rfp_id;
CREATE VIEW vw_visits AS SELECT rps_name as vst_referencePointSection, usr_name as vst_user, vst_arriveDate FROM visits JOIN referencepointsections ON visits.vst_referencePointSection = referencepointsections.rps_id JOIN users ON visits.vst_user = users.usr_document;

SELECT  ctw_name, count(rfp_id) FROM culturalwells LEFT JOIN referencepoints ON referencepoints.rfp_culturalWell = culturalwells.ctw_id GROUP BY ctw_name;
SELECT  ctw_name, count(qr_id) FROM culturalwells LEFT JOIN qrs ON qrs.qr_culturalWell = culturalwells.ctw_id GROUP BY ctw_name;

SELECT count(*) FROM vw_referencePoints;

DELIMITER |
CREATE TRIGGER tr_deleteCulturalWell BEFORE DELETE ON culturalwells
FOR EACH ROW 
	BEGIN
		DECLARE culturalWellId INT;
		SET culturalWellId = OLD.ctw_id;
        DELETE FROM referencepoints WHERE rfp_culturalWell = culturalWellId;
        DELETE FROM qrs WHERE qr_culturalWell = culturalWellId;
	END; |
DELIMITER ;

DELIMITER |
CREATE TRIGGER tr_deleteReferencePoint BEFORE DELETE ON referencepoints
FOR EACH ROW 
	BEGIN
		DECLARE referencePointId INT;
		SET referencePointId = OLD.rfp_id;
        DELETE FROM authors WHERE aut_referencePoint = referencePointId;
        DELETE FROM referencepointsections WHERE rps_referencePoint = referencePointId;
	END; |
DELIMITER ;

DELIMITER |
CREATE TRIGGER tr_deleteReferencePointSection BEFORE DELETE ON referencepointsections
FOR EACH ROW 
	BEGIN
		DECLARE referencePointSectionId INT;
		SET referencePointSectionId = OLD.rps_id;
        DELETE FROM visits WHERE vst_referencePointSection = referencePointSectionId;
        
	END; |
DELIMITER ;

-- PROCEDURES
DELIMITER |
CREATE PROCEDURE createVisit(IN referencePointSectionId INT, IN userDocument INT, IN dateVisit DATE)
BEGIN
	INSERT INTO visits values(referencePointSectionId, userDocument, dateVisit);
END; |
DELIMITER ;

-- INDEX
CREATE UNIQUE INDEX idx_culturalWellNumber ON culturalwells (ctw_phone);

