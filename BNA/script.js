/**
 * Sample transaction processor function.
 * @param {org.example.basic.CreateCattle} createCattle - create cattle transaction instance
 * @transaction
 */
function createCattle(createCattle) {
	return getAssetRegistry('org.example.basic.Cattle').then(function(result) {
    	var factory = getFactory();
      	var newCattle = factory.newResource('org.example.basic', 'Cattle', createCattle.newCattle.cattleId);
      	newCattle.birthDate = createCattle.newCattle.birthDate;
      	newCattle.gender = createCattle.newCattle.gender;
      	newCattle.breed = createCattle.newCattle.breed;
      	newCattle.lineage = createCattle.newCattle.lineage;
      	newCattle.isDead = createCattle.newCattle.isDead;
      	newCattle.birthDate = createCattle.newCattle.birthDate;
      	newCattle.farmerOwner = getCurrentParticipant();
      	return result.add(newCattle);
    });
}

/**
* @param {org.example.basic.ChangeFarmerOwner} changeFarmerOwner - create changeFarmerOwner transaction instance
* @transaction
*/
async function changeFarmerOwner(changeFarmerOwner) { 
  var newOwner = changeFarmerOwner.newOwner;
  const farmerRegistry = await getParticipantRegistry('org.example.basic.Farmer');
  var temp = await farmerRegistry.get(newOwner.farmerId);
  if (temp) {
    changeFarmerOwner.cattle.farmerOwner = newOwner;
  } else {
    throw new Error('Farmer invalid!');
  }
  const cattleRegistry = await getAssetRegistry('org.example.basic.Cattle');
  cattleRegistry.update(changeFarmerOwner.cattle);
}

/**
 * Sample transaction processor function.
 * @param {org.example.basic.OwnerUpdateCattleDetails} ownerUpdateCattleDetails - update cattle transaction instance
 * @transaction
 */
async function ownerUpdateCattleDetails(ownerUpdateCattleDetails) {
  var processor = ownerUpdateCattleDetails.processor;
  if (processor != null) {
    // checks that processor exists
  	const processorRegistry = await getParticipantRegistry('org.example.basic.Processor');
  	var temp = await processorRegistry.get(processor.processorId);
  	if (temp) {
    	ownerUpdateCattleDetails.cattle.processor = ownerUpdateCattleDetails.processor;
  	} 
  }
  ownerUpdateCattleDetails.cattle.isDead = ownerUpdateCattleDetails.isDead;
  const assetRegistry = await getAssetRegistry('org.example.basic.Cattle');
  await assetRegistry.update(ownerUpdateCattleDetails.cattle);
}


/**
 * Sample transaction processor function.
 * @param {org.example.basic.ProcessorUpdateCattleAliveStatus} processorUpdateCattleAliveStatus - update cattle alive status transaction instance
 * @transaction
 */
async function processorUpdateCattleAliveStatus(processorUpdateCattleAliveStatus) {
  processorUpdateCattleAliveStatus.cattle.isDead = processorUpdateCattleAliveStatus.isDead;
  const assetRegistry = await getAssetRegistry('org.example.basic.Cattle');
  await assetRegistry.update(processorUpdateCattleAliveStatus.cattle);
}


/**
 * Sample transaction processor function.
 * @param {org.example.basic.CertifierUpdateCattleGrade} certifierUpdateCattleGrade - update cattle grade transaction instance
 * @transaction
 */
async function certifierUpdateCattleGrade(certifierUpdateCattleGrade) {
	certifierUpdateCattleGrade.cattle.grade = certifierUpdateCattleGrade.grade;
    const assetRegistry = await getAssetRegistry('org.example.basic.Cattle');
  	await assetRegistry.update(certifierUpdateCattleGrade.cattle);
}


/**
 * Sample transaction processor function.
 * @param {org.example.basic.DeleteCattle} deleteCattle - delete cattle transaction instance
 * @transaction
 */
async function deleteCattle(deleteCattle) {
  const assetRegistry = await getAssetRegistry('org.example.basic.Cattle');
  await assetRegistry.remove(deleteCattle.cattle);
}

/**
 * Sample transaction processor function.
 * @param {org.example.basic.CreateCertificate} createCertificate - create certificate transaction instance
 * @transaction
 */
async function createCertificate(createCertificate) {
  var certificateRegistry = await getAssetRegistry('org.example.basic.Certificate');
  var factory = getFactory();
  var newCertificate = factory.newResource('org.example.basic', 'Certificate', 			
    createCertificate.newCertificate.certificateId);
  newCertificate.issueDate = createCertificate.newCertificate.issueDate;
  newCertificate.description = createCertificate.newCertificate.description;
  newCertificate.referencedCertifier = await getCurrentParticipant();
  var cattleRegistry = await getAssetRegistry('org.example.basic.Cattle');
  newCertificate.gradedCattle = await cattleRegistry.get(createCertificate.newCertificate.gradedCattle.cattleId);
  await certificateRegistry.add(newCertificate);
}

/**
 * Sample transaction processor function.
 * @param {org.example.basic.CreateBeefBatch} createBeefBatch - create beefBatch transaction instance
 * @transaction
 */
async function createBeefBatch(createBeefBatch) {
  var beefBatchRegistry = await getAssetRegistry('org.example.basic.BeefBatch');
  var factory = getFactory();
  var newBeefBatch = factory.newResource('org.example.basic', 'BeefBatch', createBeefBatch.newBeefBatch.beefBatchId);
  newBeefBatch.quantity = createBeefBatch.newBeefBatch.quantity;
  newBeefBatch.quality = createBeefBatch.newBeefBatch.quality;
  newBeefBatch.wholesaler = await getCurrentParticipant();
  var cattleRegistry = await getAssetRegistry('org.example.basic.Cattle');
  newBeefBatch.originCattle = await cattleRegistry.get(createBeefBatch.newBeefBatch.originCattle.cattleId);
  await beefBatchRegistry.add(newBeefBatch)
}

/**
 * Sample transaction processor function.
 * @param {org.example.basic.UpdateBeefBatch} updateBeefBatch - update beefBatch transaction instance
 * @transaction
 */
async function updateBeefBatch(updateBeefBatch) {
  var wholesaler = updateBeefBatch.wholesaler;
  if (wholesaler != null) {
    // check that wholesaler id exists
  	const wholesalerRegistry = await getParticipantRegistry('org.example.basic.Wholesaler');
  	var temp = await wholesalerRegistry.get(wholesaler.wholesalerId);
  	if (temp) {
    	updateBeefBatch.beefBatch.wholesaler = updateBeefBatch.wholesaler;
  	} else {
    	throw new Error('Wholesaler invalid!');
  	}
  }
  
  updateBeefBatch.beefBatch.quantity = updateBeefBatch.quantity;
  updateBeefBatch.beefBatch.quality = updateBeefBatch.quality;

  const assetRegistry = await getAssetRegistry('org.example.basic.BeefBatch');
  await assetRegistry.update(updateBeefBatch.beefBatch);
}

/**
 * Sample transaction processor function.
 * @param {org.example.basic.DeleteBeefBatch} deleteBeefBatch - update beefBatch transaction instance
 * @transaction
 */
async function deleteBeefBatch(deleteBeefBatch) {
  const assetRegistry = await getAssetRegistry('org.example.basic.BeefBatch');
  await assetRegistry.remove(deleteBeefBatch.beefBatch);
}